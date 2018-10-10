import React from 'react';

import './NoteEditor.less';

const PictureUploader = React.createClass({

    handlePictureChange(event) {
      this.props.onPictureAdd({picture: event});
    },

    render() {
        return (
            <div className='PictureUploader'>
                  <form ref='uploadForm'
                        id='uploadForm'
                  >
                    <input type="file" name="sampleFile" onChange={this.handlePictureChange}   />
                  </form>
            </div>
        );
    }
});

export default PictureUploader;
