<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'cooking_time', 'ingredients', 'instructions', 'nutrition_information', 'coach_id'];

    public function coach()
    {
        return $this->belongsTo(Coach::class);
    }

    public function favorite()
    {
        return $this->hasOne(Favorite::class);
    }
    public function review()
    {
        return $this->hasone(Review::class);
    }

    // Define the many-to-many relationship with Category
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'recipe_category', 'recipe_id', 'category_id');
    }
}

