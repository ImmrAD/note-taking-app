// routes/notes.ts
import express, { Request, Response } from 'express';
const router = express.Router();
import { auth } from '../middleware/auth';
import Note from '../models/Note';

/**
 * @route   GET /api/notes
 * @desc    Get all notes for the logged-in user
 * @access  Private
 */
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ user: req.user!.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST /api/notes
 * @desc    Create a new note
 * @access  Private
 */
router.post('/', auth, async (req: Request, res: Response) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ msg: 'Content is required' });
  }

  try {
    const newNote = new Note({
      content,
      user: req.user!.id,
    });

    const note = await newNote.save();
    res.json(note);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   DELETE /api/notes/:noteId
 * @desc    Delete a note
 * @access  Private
 */
router.delete('/:noteId', auth, async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // IMPORTANT: Check if the note belongs to the user
    if (note.user.toString() !== req.user!.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await note.deleteOne();
    res.json({ msg: 'Note removed successfully' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;