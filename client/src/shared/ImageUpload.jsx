import React from "react";
import { storage } from "../firebase";

class ImageUpload extends React.Component {
  state = {
    image: null,
    url: ""
  };
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({ image });
    }
  };
  handleUpload = (e) => {
    e.preventDefault();
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      snapshot => {
        //progress
      },
      err => {
        //error
        console.error("never loaded");
      },
      () => {
        //complete
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.props.imageUrl(url);
          }).catch(err => console.error(err));
      }
    );
  };
  render() {
    const { handleChange, handleUpload } = this;
    return (
      <div>
        <input type="file" onChange={handleChange} style={{ marginBottom: '.5rem' }} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    );
  }
}

export default ImageUpload;
