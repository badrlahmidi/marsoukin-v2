<?php

namespace App\Filament\Resources\ArtisanProfileResource\Pages;

use App\Filament\Resources\ArtisanProfileResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditArtisanProfile extends EditRecord
{
    protected static string $resource = ArtisanProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
