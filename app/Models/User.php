<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'lastname',
        'username',
        'email',
        'password',
        'role',
        'profile_picture',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function is_admin(){
        return $this->admin()->exists();
    }
    public function is_coach(){
        return $this->coach()->exists();
    }
    public function is_client(){
        return $this->client()->exists();
    }

    public function getType()
    {
        if ($this->is_admin()) {
            return 'admin';
        } elseif ($this->is_coach()) {
            return 'coach';
        } elseif ($this->is_client()) {
            return 'client';
        }
    }
    public function client(){
        return $this->hasOne(Client::class);
    }
    public function coach(){
        return $this->hasOne(Coach::class);
    }
    public function admin(){
        return $this->hasOne(Admin::class);
    }


}
