import React, { Component } from 'react';
import './Gallery.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            zoomed: false,
        }
        this.images = [];
        for (let i = 1; i < this.props.pics; i++) {
            this.images.push(require('../../imgs/' + i + '_img' + this.props.ext))
        }
    }
    ToggleZoom() {
        console.log(this.state.zoomed);

        this.setState({ zoomed: !this.state.zoomed });


    }
    render() {

        let imgs = [];
        let i = 0;
        for (let img of this.images) {
            imgs.push(
                <img src={img} alt="Nastal problém při načítaní obrázku" dataid={i} key={i} onClick={(e) => {
                    this.setState({ photoIndex: e.target.getAttribute("dataid") },
                        () => {
                            this.ToggleZoom(e);
                        })
                }} />
            )
            i++;
        }
        let images = this.images;
        let photoIndex = this.state.photoIndex;
        let lBox = null;
        if (this.state.zoomed) {
            lBox = <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => this.ToggleZoom()}
                onMovePrevRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + images.length - 1) % images.length,
                    })
                }
                onMoveNextRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + 1) % images.length,
                    })
                }
            />
        }
        return (
            <React.Fragment>
                <div className="gallery">
                    {imgs}
                </div>

                {lBox}


            </React.Fragment>

        );
    }
}

export default Gallery;