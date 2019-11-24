import React, { Component } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import './DialogGallery.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class DialogGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            photoIndex: 0,
            zoomed: false,
        }
        this.images = [];
        for (let i = 1; i < 15; i++) {
            this.images.push(require('../imgs/' + i + '_big.jpg'))
        }
    }
    componentWillReceiveProps(props) {
        if (props.open != this.state.open) {
            this.setState({ open: props.open })
        }
    }
    ToggleZoom() {
        if (this.state.open) {
            this.props.toggle();
            this.setState({ zoomed: true });
        }
        else {
            this.setState({ zoomed: false });
            this.props.toggle();
        }

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

        return (
            <React.Fragment>
                <Dialog fullScreen open={this.state.open} onClose={this.props.toggle} TransitionComponent={Transition} className="dialog-gallery">
                    <AppBar color="secondary">
                        <Toolbar className="test">
                            <h3>Galerie</h3>
                            <IconButton style={{ marginLeft: "auto" }} color="inherit" onClick={() => { this.props.toggle(); }} aria-label="close">
                                <Close />
                            </IconButton>

                        </Toolbar>
                    </AppBar>
                    <div className="img-holder">
                        {imgs}
                    </div>

                </Dialog >
                {this.state.zoomed && (
                    <Lightbox
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
                )}

            </React.Fragment>

        );
    }
}

export default DialogGallery;