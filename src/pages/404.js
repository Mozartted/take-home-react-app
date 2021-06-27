import React from "react"
import {Link} from "react-router-dom"


const NoMatch = (props) => {
    return (
        <>
            <div>
                <div style={{transition:'opacity 500ms ease-in-out', opacity:1}}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 col-sm-12 mt-5 text-center">
                                <h2>Hello there,</h2>
                                <p>Seems you lost your way 🤷🏽‍♂️</p>
                                <Link className="btn btn-primary" to={props.path}>
                                    Go to home <i className="fe fe-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoMatch