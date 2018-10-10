import axios from 'axios';

import { apiPrefix } from '../../server/config/enviroment';

export default {
    listNotes() {
        return axios.get(`${apiPrefix}/notes`);
    },

    createNote(data) {
        return axios.post(`${apiPrefix}/notes`, data);
    },

    uploadPicture() {
       var data = new FormData();
       const imagedata = document.querySelector('input[type="file"]').files[0];
       data.append("sampleFile", imagedata);

       return axios({
         url: `${apiPrefix}/upload`,
         method: 'POST',
         data: data,
         headers: {
           Accept: 'application/json',
           'Content-Type': 'multipart/form-data'
         }
       })
         .then(res => {
            return res;
         });
    },

    updatePicture(note) {
      var data = new FormData();
      const noteElement = document.querySelector(`div[data-reactid=".0.2.$${note.picture.id}"]`);
      const imagedata = noteElement.querySelector('input[type="file"]').files[0];
      data.append("sampleFile", imagedata);

      return axios({
        url: `${apiPrefix}/upload`,
        method: 'POST',
        data: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          return res;
        });
    },

    updateNote(noteId, data) {
        return axios.put(`${apiPrefix}/notes/${noteId}`, data);
    },

    deleteNote(noteId) {
        return axios.delete(`${apiPrefix}/notes/${noteId}`);
    }
}
