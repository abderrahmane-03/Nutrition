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
        'gender',
        'programme',
        'duration',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
    public function favorite()
    {
        return $this->hasOne(Favorite::class);
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
