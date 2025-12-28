<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?string $navigationLabel = 'Produits';

    protected static ?string $navigationGroup = 'Catalogue';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informations du Produit')
                    ->schema([
                        Forms\Components\Select::make('artisan_profile_id')
                            ->label('Artisan')
                            ->relationship('artisanProfile', 'shop_name')
                            ->searchable()
                            ->preload()
                            ->required(),
                        
                        Forms\Components\Select::make('category_id')
                            ->label('Catégorie')
                            ->relationship('category', 'name')
                            ->searchable()
                            ->preload()
                            ->required(),
                        
                        Forms\Components\TextInput::make('title')
                            ->label('Titre')
                            ->required()
                            ->maxLength(255)
                            ->reactive()
                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', \Str::slug($state))),
                        
                        Forms\Components\TextInput::make('slug')
                            ->label('Slug (URL)')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        
                        Forms\Components\RichEditor::make('description')
                            ->label('Description')
                            ->required()
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Prix et Stock')
                    ->schema([
                        Forms\Components\TextInput::make('base_price')
                            ->label('Prix (MAD)')
                            ->required()
                            ->numeric()
                            ->prefix('MAD')
                            ->minValue(0),
                        
                        Forms\Components\TextInput::make('stock')
                            ->label('Stock')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->default(0),
                        
                        Forms\Components\Select::make('status')
                            ->label('Statut')
                            ->options([
                                'draft' => 'Brouillon',
                                'active' => 'Actif',
                                'hidden' => 'Masqué',
                                'rejected' => 'Rejeté',
                            ])
                            ->required()
                            ->default('draft'),
                        
                        Forms\Components\Toggle::make('is_featured')
                            ->label('Produit vedette')
                            ->default(false),
                    ])
                    ->columns(4),

                Forms\Components\Section::make('Détails Physiques')
                    ->schema([
                        Forms\Components\TextInput::make('weight')
                            ->label('Poids (kg)')
                            ->numeric()
                            ->suffix('kg'),
                        
                        Forms\Components\TextInput::make('dimensions')
                            ->label('Dimensions (L x W x H cm)')
                            ->placeholder('30 x 20 x 10'),
                        
                        Forms\Components\TextInput::make('origin_city')
                            ->label('Ville d\'origine')
                            ->maxLength(100),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Produit')
                    ->searchable()
                    ->sortable()
                    ->limit(30),
                
                Tables\Columns\TextColumn::make('artisanProfile.shop_name')
                    ->label('Artisan')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Catégorie')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('base_price')
                    ->label('Prix')
                    ->money('MAD')
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('stock')
                    ->label('Stock')
                    ->sortable()
                    ->color(fn ($state) => $state > 10 ? 'success' : ($state > 0 ? 'warning' : 'danger')),
                
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Statut')
                    ->colors([
                        'secondary' => 'draft',
                        'success' => 'active',
                        'warning' => 'hidden',
                        'danger' => 'rejected',
                    ])
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'draft' => 'Brouillon',
                        'active' => 'Actif',
                        'hidden' => 'Masqué',
                        'rejected' => 'Rejeté',
                    }),
                
                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Vedette')
                    ->boolean(),
                
                Tables\Columns\TextColumn::make('views_count')
                    ->label('Vues')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'draft' => 'Brouillon',
                        'active' => 'Actif',
                        'hidden' => 'Masqué',
                        'rejected' => 'Rejeté',
                    ]),
                
                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Produit vedette'),
                
                Tables\Filters\SelectFilter::make('category')
                    ->relationship('category', 'name')
                    ->label('Catégorie'),
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
