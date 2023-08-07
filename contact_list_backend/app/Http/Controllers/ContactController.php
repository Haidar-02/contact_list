<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }

    public function getContact($id)
    {
        try {
            $contact = Contact::findOrFail($id);
            return response()->json(['contact' => $contact], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Contact not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $contact = Contact::create($request->all());
        return response()->json($contact, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        $contact->update($request->all());
        dd($contact);
        return response()->json($contact);
    }

    public function destroy($id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        $contact->delete();
        return response()->json(['message' => 'Contact deleted successfully']);
    }
}
