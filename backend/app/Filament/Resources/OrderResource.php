<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Infolists;
use Filament\Infolists\Infolist;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart';

    protected static ?string $navigationLabel = 'Commandes';

    protected static ?string $navigationGroup = 'Ventes';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informations de la Commande')
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->label('Client')
                            ->relationship('user', 'name')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->disabled(),
                        
                        Forms\Components\TextInput::make('order_number')
                            ->label('Numéro de commande')
                            ->disabled()
                            ->required(),
                        
                        Forms\Components\Select::make('status')
                            ->label('Statut')
                            ->options([
                                'pending' => 'En attente',
                                'paid' => 'Payée',
                                'processing' => 'En traitement',
                                'shipped' => 'Expédiée',
                                'completed' => 'Complétée',
                                'cancelled' => 'Annulée',
                                'refunded' => 'Remboursée',
                            ])
                            ->required(),
                        
                        Forms\Components\Select::make('payment_status')
                            ->label('Statut de paiement')
                            ->options([
                                'pending' => 'En attente',
                                'paid' => 'Payé',
                                'failed' => 'Échoué',
                                'refunded' => 'Remboursé',
                            ])
                            ->required(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Détails de Paiement')
                    ->schema([
                        Forms\Components\Select::make('payment_method')
                            ->label('Méthode de paiement')
                            ->options([
                                'cod' => 'Paiement à la livraison',
                                'card' => 'Carte bancaire',
                                'bank_transfer' => 'Virement bancaire',
                            ])
                            ->required(),
                        
                        Forms\Components\TextInput::make('transaction_id')
                            ->label('ID Transaction')
                            ->maxLength(255),
                        
                        Forms\Components\DateTimePicker::make('paid_at')
                            ->label('Payé le'),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Montants')
                    ->schema([
                        Forms\Components\TextInput::make('subtotal')
                            ->label('Sous-total')
                            ->numeric()
                            ->prefix('MAD')
                            ->disabled(),
                        
                        Forms\Components\TextInput::make('shipping_total')
                            ->label('Frais de livraison')
                            ->numeric()
                            ->prefix('MAD')
                            ->disabled(),
                        
                        Forms\Components\TextInput::make('commission_total')
                            ->label('Commission totale')
                            ->numeric()
                            ->prefix('MAD')
                            ->disabled(),
                        
                        Forms\Components\TextInput::make('total')
                            ->label('Total')
                            ->numeric()
                            ->prefix('MAD')
                            ->disabled(),
                    ])
                    ->columns(4),

                Forms\Components\Section::make('Notes')
                    ->schema([
                        Forms\Components\Textarea::make('notes')
                            ->label('Notes')
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('order_number')
                    ->label('N° Commande')
                    ->searchable()
                    ->sortable()
                    ->copyable(),
                
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Client')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Statut')
                    ->colors([
                        'warning' => 'pending',
                        'info' => 'paid',
                        'primary' => 'processing',
                        'success' => fn ($state) => in_array($state, ['shipped', 'completed']),
                        'danger' => fn ($state) => in_array($state, ['cancelled', 'refunded']),
                    ])
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'En attente',
                        'paid' => 'Payée',
                        'processing' => 'En traitement',
                        'shipped' => 'Expédiée',
                        'completed' => 'Complétée',
                        'cancelled' => 'Annulée',
                        'refunded' => 'Remboursée',
                    }),
                
                Tables\Columns\BadgeColumn::make('payment_status')
                    ->label('Paiement')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'paid',
                        'danger' => 'failed',
                        'secondary' => 'refunded',
                    ])
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'En attente',
                        'paid' => 'Payé',
                        'failed' => 'Échoué',
                        'refunded' => 'Remboursé',
                    }),
                
                Tables\Columns\TextColumn::make('payment_method')
                    ->label('Méthode')
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'cod' => 'À la livraison',
                        'card' => 'Carte',
                        'bank_transfer' => 'Virement',
                    }),
                
                Tables\Columns\TextColumn::make('total')
                    ->label('Total')
                    ->money('MAD')
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('items_count')
                    ->label('Articles')
                    ->counts('items')
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'paid' => 'Payée',
                        'processing' => 'En traitement',
                        'shipped' => 'Expédiée',
                        'completed' => 'Complétée',
                        'cancelled' => 'Annulée',
                        'refunded' => 'Remboursée',
                    ])
                    ->multiple(),
                
                Tables\Filters\SelectFilter::make('payment_status')
                    ->label('Statut de paiement')
                    ->options([
                        'pending' => 'En attente',
                        'paid' => 'Payé',
                        'failed' => 'Échoué',
                        'refunded' => 'Remboursé',
                    ]),
                
                Tables\Filters\SelectFilter::make('payment_method')
                    ->label('Méthode de paiement')
                    ->options([
                        'cod' => 'Paiement à la livraison',
                        'card' => 'Carte bancaire',
                        'bank_transfer' => 'Virement bancaire',
                    ]),
                
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('created_from')
                            ->label('Du'),
                        Forms\Components\DatePicker::make('created_until')
                            ->label('Au'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['created_from'], fn ($query, $date) => $query->whereDate('created_at', '>=', $date))
                            ->when($data['created_until'], fn ($query, $date) => $query->whereDate('created_at', '<=', $date));
                    }),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                
                Tables\Actions\Action::make('markAsPaid')
                    ->label('Marquer comme payé')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->action(fn (Order $record) => $record->markAsPaid())
                    ->visible(fn (Order $record) => $record->payment_status !== 'paid'),
                
                Tables\Actions\Action::make('cancel')
                    ->label('Annuler')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->action(fn (Order $record) => $record->cancel())
                    ->visible(fn (Order $record) => $record->canBeCancelled()),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Informations de la Commande')
                    ->schema([
                        Infolists\Components\TextEntry::make('order_number')
                            ->label('N° Commande'),
                        Infolists\Components\TextEntry::make('user.name')
                            ->label('Client'),
                        Infolists\Components\TextEntry::make('status')
                            ->label('Statut')
                            ->badge(),
                        Infolists\Components\TextEntry::make('payment_status')
                            ->label('Statut de paiement')
                            ->badge(),
                        Infolists\Components\TextEntry::make('payment_method')
                            ->label('Méthode de paiement'),
                        Infolists\Components\TextEntry::make('created_at')
                            ->label('Créé le')
                            ->dateTime('d/m/Y H:i'),
                    ])
                    ->columns(3),

                Infolists\Components\Section::make('Montants')
                    ->schema([
                        Infolists\Components\TextEntry::make('subtotal')
                            ->label('Sous-total')
                            ->money('MAD'),
                        Infolists\Components\TextEntry::make('shipping_total')
                            ->label('Livraison')
                            ->money('MAD'),
                        Infolists\Components\TextEntry::make('commission_total')
                            ->label('Commission')
                            ->money('MAD'),
                        Infolists\Components\TextEntry::make('total')
                            ->label('Total')
                            ->money('MAD'),
                    ])
                    ->columns(4),

                Infolists\Components\Section::make('Adresses')
                    ->schema([
                        Infolists\Components\TextEntry::make('shippingAddress.full_address')
                            ->label('Adresse de livraison'),
                        Infolists\Components\TextEntry::make('billingAddress.full_address')
                            ->label('Adresse de facturation'),
                    ])
                    ->columns(2),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'view' => Pages\ViewOrder::route('/{record}'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
