<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Sleep;
use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use Illuminate\Http\Request;

Sleep::sleep(4);
class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return StudentResource::collection(Student::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'index' => 'required|regex:/^s[0-9]{3}$/|unique:students,index',
            'email' => 'required|email|unique:students,email',
            'age' => 'required|numeric|min:18',
            'description' => 'nullable|string|max:1000',
            'paid' => 'nullable|boolean',
        ], [
            'index.regex' => "The correct format is 's' plus 3 digits! E.g. s001",
        ]);

        $student = Student::create($data);

        return new StudentResource($student);
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        return new StudentResource($student);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $data = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'index' => "required|regex:/^s[0-9]{3}$/|unique:students,index,{$student->id}",
            'email' => "required|email|unique:students,email,{$student->id}",
            'age' => 'required|numeric|min:18',
            'description' => 'nullable|string|max:1000',
            'paid' => 'nullable|boolean',
        ], [
            'index.regex' => "The correct format is 's' plus 3 digits! E.g. s001",
        ]);

        $student->update($data);

        return new StudentResource($student);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return response()->json('Deleted', 204);
    }
}
