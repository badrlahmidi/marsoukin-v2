<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArtisanProfileResource\Pages;
use App\Models\ArtisanProfile;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ArtisanProfileResource extends Resource
{
    protected static ?string $model = ArtisanProfile::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Profils Artisans';

    protected static ?string $navigationGroup = 'Gestion';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informations de l\'Artisan')
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->label('Utilisateur')
                            ->relationship('user', 'name')
                            ->searchable()
                            ->preload()
                            ->required(),
                        
                        Forms\Components\TextInput::make('shop_name')
                            ->label('Nom de la boutique')
                            ->required()
                            ->maxLength(255),
                        
                        Forms\Components\TextInput::make('slug')
                            ->label('Slug (URL)')
                            ->maxLength(255)
                            ->disabled()
                            ->dehydrated(),
                        
                        Forms\Components\Select::make('status')
                            ->label('Statut')
                            ->options([
                                'pending' => 'En attente',
                                'approved' => 'Approuvé',
                                'rejected' => 'Rejeté',
                                'suspended' => 'Suspendu',
                            ])
                            ->required()
                            ->default('pending'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Localisation')
                    ->schema([
                        Forms\Components\TextInput::make('city')
                            ->label('Ville')
                            ->required()
                            ->maxLength(100),
                        
                        Forms\Components\TextInput::make('country')
                            ->label('Pays')
                            ->default('Morocco')
                            ->maxLength(100),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Description')
                    ->schema([
                        Forms\Components\Textarea::make('bio')
                            ->label('Biographie')
                            ->rows(4)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Médias')
                    ->schema([
                        Forms\Components\FileUpload::make('logo_url')
                            ->label('Logo')
                            ->image()
                            ->directory('artisan-logos'),
                        
                        Forms\Components\FileUpload::make('banner_url')
                            ->label('Bannière')
                            ->image()
                            ->directory('artisan-banners'),
                        
                        Forms\Components\FileUpload::make('identity_document_url')
                            ->label('Document d\'identité')
                            ->directory('artisan-documents'),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Artisan')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('shop_name')
                    ->label('Boutique')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('city')
                    ->label('Ville')
                    ->searchable(),
                
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Statut')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'approved',
                        'danger' => 'rejected',
                        'secondary' => 'suspended',
                    ])
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'En attente',
                        'approved' => 'Approuvé',
                        'rejected' => 'Rejeté',
                        'suspended' => 'Suspendu',
                    }),
                
                Tables\Columns\TextColumn::make('products_count')
                    ->label('Produits')
                    ->counts('products')
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'approved' => 'Approuvé',
                        'rejected' => 'Rejeté',
                        'suspended' => 'Suspendu',
                    ]),
                
                Tables\Filters\SelectFilter::make('city')
                    ->label('Ville')
                    ->options(fn () => ArtisanProfile::pluck('city', 'city')->unique()->toArray()),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListArtisanProfiles::route('/'),
            'create' => Pages\CreateArtisanProfile::route('/create'),
            'edit' => Pages\EditArtisanProfile::route('/{record}/edit'),
        ];
    }
}
