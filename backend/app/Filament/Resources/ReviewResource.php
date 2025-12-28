<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReviewResource\Pages;
use App\Models\Review;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Infolists;
use Filament\Infolists\Infolist;

class ReviewResource extends Resource
{
    protected static ?string $model = Review::class;

    protected static ?string $navigationIcon = 'heroicon-o-star';

    protected static ?string $navigationLabel = 'Avis Clients';

    protected static ?string $navigationGroup = 'Ventes';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informations de l\'Avis')
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->label('Client')
                            ->relationship('user', 'name')
                            ->disabled(),
                        
                        Forms\Components\Select::make('product_id')
                            ->label('Produit')
                            ->relationship('product', 'title')
                            ->disabled(),
                        
                        Forms\Components\TextInput::make('rating')
                            ->label('Note')
                            ->numeric()
                            ->minValue(1)
                            ->maxValue(5)
                            ->disabled(),
                        
                        Forms\Components\Textarea::make('comment')
                            ->label('Commentaire')
                            ->rows(4)
                            ->disabled()
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Modération')
                    ->schema([
                        Forms\Components\Toggle::make('is_approved')
                            ->label('Approuvé')
                            ->default(true),
                        
                        Forms\Components\Toggle::make('is_verified_purchase')
                            ->label('Achat vérifié')
                            ->disabled(),
                        
                        Forms\Components\Textarea::make('admin_response')
                            ->label('Réponse de l\'équipe')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Client')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('product.title')
                    ->label('Produit')
                    ->searchable()
                    ->sortable()
                    ->limit(30),
                
                Tables\Columns\TextColumn::make('artisanProfile.shop_name')
                    ->label('Artisan')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('rating')
                    ->label('Note')
                    ->sortable()
                    ->formatStateUsing(fn ($state) => str_repeat('⭐', $state))
                    ->color(fn ($state) => $state >= 4 ? 'success' : ($state >= 3 ? 'warning' : 'danger')),
                
                Tables\Columns\TextColumn::make('comment')
                    ->label('Commentaire')
                    ->limit(50)
                    ->wrap(),
                
                Tables\Columns\IconColumn::make('is_verified_purchase')
                    ->label('Vérifié')
                    ->boolean()
                    ->sortable(),
                
                Tables\Columns\IconColumn::make('is_approved')
                    ->label('Approuvé')
                    ->boolean()
                    ->sortable(),
                
                Tables\Columns\IconColumn::make('admin_response')
                    ->label('Répondu')
                    ->boolean()
                    ->getStateUsing(fn ($record) => !empty($record->admin_response)),
                
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('rating')
                    ->label('Note')
                    ->options([
                        5 => '5 étoiles',
                        4 => '4 étoiles',
                        3 => '3 étoiles',
                        2 => '2 étoiles',
                        1 => '1 étoile',
                    ]),
                
                Tables\Filters\TernaryFilter::make('is_approved')
                    ->label('Approuvé'),
                
                Tables\Filters\TernaryFilter::make('is_verified_purchase')
                    ->label('Achat vérifié'),
                
                Tables\Filters\Filter::make('has_response')
                    ->label('A une réponse')
                    ->query(fn ($query) => $query->whereNotNull('admin_response')),
                
                Tables\Filters\SelectFilter::make('artisan')
                    ->relationship('artisanProfile', 'shop_name')
                    ->label('Artisan'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                
                Tables\Actions\Action::make('approve')
                    ->label('Approuver')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->action(fn (Review $record) => $record->approve())
                    ->visible(fn (Review $record) => !$record->is_approved),
                
                Tables\Actions\Action::make('reject')
                    ->label('Rejeter')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->action(fn (Review $record) => $record->reject())
                    ->visible(fn (Review $record) => $record->is_approved),
                
                Tables\Actions\Action::make('respond')
                    ->label('Répondre')
                    ->icon('heroicon-o-chat-bubble-left-right')
                    ->color('info')
                    ->form([
                        Forms\Components\Textarea::make('response')
                            ->label('Réponse')
                            ->required()
                            ->rows(4),
                    ])
                    ->action(function (Review $record, array $data) {
                        $record->addResponse($data['response']);
                        
                        \Filament\Notifications\Notification::make()
                            ->title('Réponse ajoutée')
                            ->success()
                            ->send();
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    
                    Tables\Actions\BulkAction::make('approve')
                        ->label('Approuver')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->action(fn ($records) => $records->each->approve()),
                    
                    Tables\Actions\BulkAction::make('reject')
                        ->label('Rejeter')
                        ->icon('heroicon-o-x-circle')
                        ->color('danger')
                        ->requiresConfirmation()
                        ->action(fn ($records) => $records->each->reject()),
                ]),
            ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Détails de l\'Avis')
                    ->schema([
                        Infolists\Components\TextEntry::make('user.name')
                            ->label('Client'),
                        Infolists\Components\TextEntry::make('product.title')
                            ->label('Produit'),
                        Infolists\Components\TextEntry::make('artisanProfile.shop_name')
                            ->label('Artisan'),
                        Infolists\Components\TextEntry::make('rating')
                            ->label('Note')
                            ->formatStateUsing(fn ($state) => str_repeat('⭐', $state)),
                        Infolists\Components\IconEntry::make('is_verified_purchase')
                            ->label('Achat vérifié')
                            ->boolean(),
                        Infolists\Components\IconEntry::make('is_approved')
                            ->label('Approuvé')
                            ->boolean(),
                    ])
                    ->columns(3),

                Infolists\Components\Section::make('Commentaire')
                    ->schema([
                        Infolists\Components\TextEntry::make('comment')
                            ->label('')
                            ->prose(),
                    ]),

                Infolists\Components\Section::make('Réponse de l\'équipe')
                    ->schema([
                        Infolists\Components\TextEntry::make('admin_response')
                            ->label('')
                            ->prose()
                            ->placeholder('Aucune réponse'),
                        Infolists\Components\TextEntry::make('responded_at')
                            ->label('Répondu le')
                            ->dateTime('d/m/Y H:i'),
                    ])
                    ->visible(fn ($record) => !empty($record->admin_response)),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListReviews::route('/'),
            'view' => Pages\ViewReview::route('/{record}'),
            'edit' => Pages\EditReview::route('/{record}/edit'),
        ];
    }
}
