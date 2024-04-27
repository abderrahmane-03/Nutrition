<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Count occurrences of coache_id and update coach_count column
        DB::statement("
            UPDATE favorites f
            JOIN (
                SELECT coache_id, COUNT(*) AS coach_count
                FROM favorites
                WHERE coache_id IS NOT NULL
                GROUP BY coache_id
            ) AS coache_counts ON f.coache_id = coache_counts.coache_id
            SET f.coach_count = coache_counts.coach_count
        ");

        // Count occurrences of recipe_id and update recipe_count column
        DB::statement("
            UPDATE favorites f
            JOIN (
                SELECT recipe_id, COUNT(*) AS recipe_count
                FROM favorites
                WHERE recipe_id IS NOT NULL
                GROUP BY recipe_id
            ) AS recipe_counts ON f.recipe_id = recipe_counts.recipe_id
            SET f.recipe_count = recipe_counts.recipe_count
        ");
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('favorites', function (Blueprint $table) {
            //
        });
    }
};
