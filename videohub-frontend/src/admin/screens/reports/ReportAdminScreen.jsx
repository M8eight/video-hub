import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { request } from "../../../helpers/axios_helper";

export default function ReportAdminScreen(props) {

  const [reports, setReports] = React.useState([]);

  const [offset, setOffset] = React.useState(0);

  useEffect(() => {
    getReports();
  }, []);

  function getReports() {
    request("get", '/api/report/all?offset=' + offset + '&limit=20').then((res) => {
      console.log(res.data.content);
      setReports(res.data.content);
    });
  }

  return (
    <React.Fragment>
      <div>

        <h2 className="text-center">Жалобы</h2>

        {reports?.length === 0 && (
          <div className="text-center text-bg-danger">
            Нет жалоб
          </div>
        )}

        <InfiniteScroll
          dataLength={reports.length}
          next={getReports}
          hasMore={!reports.last}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Все жалобы загружены</b>
            </p>
          }
        >
          {reports?.map((report) => (
            <div className="card mb-3 p-3">

              {report.video !== null ? (<div>
                <p>Видео</p>
                <a href={"/video/" + report.video.id}>
                  <img className="card-img-top" src={"http://localhost:8080/pictures/" + report.video.preview_path} alt="..." />
                </a>
              </div>) : null}


              {report.user !== null ? <div>
                <p>Пользователь</p>
                <img style={{ width: "200px", height: "200px" }} src={report.user.avatar_path !== null ? ("localhost:8080/pictures/" + report.user.avatar_path) : ("/default-avatar.png")} className="card-img-top" alt="..." />
              </div> : null}

              <div className="card-body">
                <h5 className="card-title">
                  Жалоба на
                  {report.user !== null ? (<React.Fragment> Пользователя: <a className="text-decoration-none fs-4" href={"/user/" + report.user.id}>{report.user.login}</a>  </React.Fragment>) : null}
                  {report.video !== null ? (<span className="text-bg-secondary"> Видео:  {report.video.name} </span>) : null}
                </h5>
                <p className="card-text">Описание жалобы: {report.message}</p>

                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-warning">Забанить</button>
                  <button type="button" className="btn btn-danger">Удалить жалобу</button>
                  <button type="button" className="btn btn-secondary">Удалить жалобу</button>
                </div>

              </div>
            </div>
          ))}
        </InfiniteScroll>

      </div>
    </React.Fragment>
  );
}
