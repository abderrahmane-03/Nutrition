<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coach extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'experience',
        'sport',
        'gender'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
    public function favorites()
    {
        return $this->belongsTo(Favorite::class);
    }
    public function categories()
    {
        return $this->belongsTo(Category::class);
    }
    public function recipes()
    {
        return $this->hasMany(Recipe::class);
    }
}
