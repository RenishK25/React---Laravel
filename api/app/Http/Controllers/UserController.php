<?php

namespace App\Http\Controllers;

use App\Mail\TestMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'email' => ['required'],
            'password' => ['required'],
        ]);

        $user = User::create($data);

        if($user){
            // return redirect()->route('login');
            return response(["status" => "success"]);

        }
    }
    
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);


        if(Auth::attempt($data)){
            // dd(Auth::user());
            return response()->json(['status' => 'success', 'user' => ["email" => Auth::user()->email, "name" => Auth::user()->name]]);
            // return response(["status" => "success", "user" => Auth::user()]);
            // return redirect()->route('dashboard');
        }else{
            return response(["status" => "fail", "error" => "Login Not Successful"]);
        }
    }
    
    public function logout(Request $request)
    {
        Auth::logout();
        return response(["status" => "success"]);

    }
    
    public function dashboard(Request $request)
    {
        return view("dashboard");
    }
    
    public function mailSend(Request $request)
    {
        $data = "This is Test Mail";
        $user = User::findOrFail(1); 
        // Mail::to("kalariyarenish32@gmail.com")->send(new TestMail("Test Mail", $data));
        $mail = Mail::to("kalariyarenish32@gmail.com")->send(new TestMail("Test Mail", $user));

        if($mail){
            return response(['status' => "success", ]);
        }
    }
}
