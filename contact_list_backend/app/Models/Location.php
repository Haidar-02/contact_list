<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;
    protected $fillable = ['latitude', 'longitude', 'location_name'];
    public function contacts()
    {
        return $this->belongsToMany(Contact::class, 'contacts_locations');
    }
}
