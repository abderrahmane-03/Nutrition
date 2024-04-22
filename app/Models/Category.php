<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Define the many-to-many relationship with Recipe
    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_category', 'category_id', 'recipe_id');
    }
    public function coaches()
    {
        return $this->hasMany(Coach::class);
    }
}
