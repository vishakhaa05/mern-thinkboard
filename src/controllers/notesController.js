import Note from "../model/Note.js";

export async function getAllNotes(req, res) {

    try {
        const notes = await Note.find().sort({ createdAt: -1 });

        res.status(200).json(notes);
    } catch (error) {
        console.error("error in getAllNotes", error);

        res.status(500).json({
            message: "internal server error"
        });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found!"
            });
        }

        res.status(200).json(note);

    } catch (error) {
        console.log("error in getting posts", error);

        res.status(500).json({
            message: "internal server error"
        });
    }
}

export async function createAllNotes(req, res) {
    try {
        const { title, content } = req.body;

        console.log(title, content);

        const note = new Note({
            title,
            content
        });

        await note.save();

        res.status(201).json({
            message: "note created successfully"
        });
    } catch (error) {
        console.error("error in createNote controller", error);

        res.status(500).json({
            message: "internal server error"
        });
    }
}

export async function updateAllNotes(req, res) {
    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            {
                new: true
            }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "note updated successfully",
            note: updatedNote
        });

    } catch (error) {
        console.log("error in updating posts", error);

        res.status(500).json({
            message: "internal server error"
        });
    }
}

export async function deleteAllNotes(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(
            req.params.id
        );

        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully!"
        });

    } catch (error) {
        console.log("error in deleting posts", error);

        res.status(500).json({
            message: "internal server error"
        });
    }
}