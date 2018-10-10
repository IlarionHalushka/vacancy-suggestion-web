import React from 'react';

import ColorPicker from './ColorPicker.jsx';
import PictureUploader from './PictureUploader.jsx';

import './NoteEditor.less';

import uploads from './../helpers/uploads'

const NoteEditor = React.createClass({
    getInitialState() {
        return {
            title: '',
            text: '',
            color: '#FFFFFF',
            picture: ''
        };
    },

    handleTextChange(event) {
        this.setState({ text: event.target.value });
    },

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    },

    handleColorChange(color) {
        this.setState({ color });
    },

    handlePictureChange(event) {
      console.log('noteEDITOR handle pic change -- event');
      console.log(event);
      this.props.onPictureAdd({picture: event});
    },

    handleNoteAdd() {
        const newNote = {
            title: this.state.title,
            text: this.state.text,
            color: this.state.color,
            picture: uploads.single.name
        };

        this.props.onNoteAdd(newNote);
        this.setState({ text: '', title: '', color: '#FFFFFF', picture: '' });
    },

    render() {
        return (
            <div className='NoteEditor'>
                <input
                    type='text'
                    className='NoteEditor__title'
                    placeholder='Enter title'
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                />
                <textarea
                    placeholder='Enter note text'
                    rows={5}
                    className='NoteEditor__text'
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <div className='NoteEditor__footer'>
                    <ColorPicker
                      value={this.state.color}
                      onChange={this.handleColorChange}
                    />
                    <PictureUploader className='PictureAdding'
                      onPictureAdd={this.handlePictureChange}
                    />
                    <button
                        className='NoteEditor__button'
                        disabled={!this.state.text}
                        onClick={this.handleNoteAdd}
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }
});

export default NoteEditor;
