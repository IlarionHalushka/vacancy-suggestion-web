import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const NoteActions = {
    loadNotes() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_NOTES_REQUEST
        });

        api.listNotes()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_NOTES_SUCCESS,
                notes: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_NOTES_FAIL,
                error: err
            })
        );
    },

    createNote(note) {
      api.createNote(note)
        .then(() =>
          this.loadNotes()
      )
      .catch(err =>
        console.error(err)
      );
    },

    uploadPicture() {
      return api.uploadPicture()
        .then(res => {
          return res;
        })
        .catch(err =>
          console.error(err)
        );
    },

    updatePicture(note) {
      console.log('note');
      console.log(note);
      return api.updatePicture(note)
        .then(res => {
          return res;
        })
        .catch(err =>
          console.error(err)
        );
    },

    deleteNote(noteId) {
        api.deleteNote(noteId)
        .then(() =>
            this.loadNotes()
        )
        .catch(err =>
            console.error(err)
        );
    },

    updateNote(noteId, note) {
        api.updateNote(noteId, note)
        .then(() =>
            this.loadNotes()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default NoteActions;
