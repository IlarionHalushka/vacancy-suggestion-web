import React from 'react';

import './Note.less';
import PictureUploader from './PictureUploader.jsx';

import $ from 'jquery';
import uploads from "../helpers/uploads";

const Note = React.createClass({
    getInitialState() {
        return {
            title: this.props.title,
            text: this.props.children,
            id: this.props.id,
            color: this.props.color,
            picture: this.props.picture
        };
    },

    handleTextChange(event) {
        this.setState({ text: event.target.value });
    },

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    },

    handlePictureChange(event) {
      this.props.onPictureAdd(event);
    },

    handleEditButton(event) {
        $(event.target).siblings('.Note__save-button').toggle();
        $(event.target).siblings('form').children('.Note__title').prop('disabled', function (_, val) { return ! val; });
      $(event.target).siblings('.PictureUploader').toggle();
      $(event.target).siblings('form').children('.Note__text').prop('disabled', function (_, val) { return ! val; });
    },

    handleSaveButton(event) {
      this.setState({ picture: uploads.single.name}, function() {
        this.props.onUpdate.bind(null, this.state)();
      });
      $(event.target).toggle();
      $(event.target).siblings('.PictureUploader').toggle();
      $(event.target).siblings('form').children('.Note__title').prop('disabled', function (_, val) { return ! val; });
        $(event.target).siblings('form').children('.Note__text').prop('disabled', function (_, val) { return ! val; });
    },

    render() {
        const style = { backgroundColor: this.props.color };

        return (
            <div className='Note' style={style}>
                <span className='Note__del-icon' onClick={this.props.onDelete}> × </span> 
                <span className='Note__update-icon' onClick={this.handleEditButton}> ✎ </span>
                <button id='saveNoteBtn' className='Note__save-button' onClick={this.handleSaveButton}> Save </button>

                {
                    this.state.title
                    ?
                        <form>
                            <label>Title: </label>
                            <input className='Note__title' disabled='true' value={this.state.title} onChange={this.handleTitleChange}/>
                        </form>
                    :
                        null
                }

                <form>
                    <label>Text: </label>
                    <input className='Note__text' disabled value={this.state.text} onChange={this.handleTextChange}/>
                </form>
              {
                this.props.picture
                  ?
                  <img src={`http://localhost:8080/upload/${this.props.picture}`}
                       className='noteImage'
                  />
                  :
                  null
              }

              <PictureUploader
                onPictureAdd={this.handlePictureChange}
              />
            </div>
        );
    }
});

export default Note;
