<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('coaches', function (Blueprint $table) {
            $table->id();
            $table->string('bio');
            $table->string('experience');
            $table->string('price');
            $table->string('sport');
            $table->text('programme');
            $table->text('duration');
            $table->foreignId('user_id')->constrained('users');
            $table->boolean('verified')->default(false);
            $table->timestamps();
        });
        Schema::table('coaches', function (Blueprint $table) {
            $table->decimal('avg_rating', 5, 2)->default(0.00);
        });

        DB::statement("
            UPDATE coaches c
            SET avg_rating = (
                SELECT AVG(rating)
                FROM reviews
                WHERE coache_id = c.id
            )
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('volunteers');
    }
};
