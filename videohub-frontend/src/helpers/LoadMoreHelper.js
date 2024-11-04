import toHHMMSS from "./toHHMMSS"
import { React, useEffect } from "react"

/**
 * Component for loading more content on scroll. Expects two props:
 * - callbackFirstLoad: function that will be called on first render to load initial content
 * - callbackLoadMore: function that will be called on scroll to load more content
 * 
 * Returns a component that renders a list of cards with preview images, names and durations.
 * The list is loaded on first render and on scroll.
 * 
 * @param {Object} props - object with two props: callbackFirstLoad and callbackLoadMore
 * @returns {React.Component} - React component that renders the list of cards
 * @deprecated
 */

export default function LoadMoreHelper(props) {
    const callbackFirstLoad = props.callbackFirstLoad
    const callbackLoadMore = props.callbackLoadMore
    const [list, setList] = React.useState([]);

    useEffect(() => {
        callbackFirstLoad().then(res => setList(res.data.content));
    }, []);

    function loadMore() {
        setList(callbackLoadMore().then(res => list.concat(res.data.content)));
    }

    return (
        <div className="row row-cols-1 row-cols-md-5 g-4">
            {list.content?.map((el) => (
                <div key={el.id} className="col">
                    <a href={"http://localhost:3000/video/" + el.id}>
                        <div className="card mb-3 parent">
                            <img className="card-img-top preview" src={"http://localhost:8080/media/" + el.preview_path} alt="" />
                            <span className="card-body">
                                <h6 className="mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill me-1 mb-1" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                    </svg>
                                    {el.views}
                                </h6>
                            </span>
                            <span className="card-body float-end">
                                <h6 className="float-end mb-4">{toHHMMSS(el.duration)}</h6>
                            </span>
                            <div className="card-body p-1">
                                <h6 className="card-title cut-text m-1">{el.name}</h6>
                            </div>
                        </div>
                    </a>
                </div >
            ))}
            <button className="btn btn-warning" onClick={() => loadMore()}>Load More</button>
        </div>
    )
}