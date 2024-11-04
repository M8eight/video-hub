import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getReports, getMoreReports } from "../../../../slices/report/reportRequests";

export default function ReportAdminScreen(props) {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.report);

  const limit = 5;
  const [offset, setOffset] = React.useState(0);

  useEffect(() => {
    dispatch(getReports({ offset, limit }));
  }, []);

  const nextReports = () => {
    setOffset(offset + 1);
    dispatch(getMoreReports({ offset, limit }));
  }

  return (
    <React.Fragment>
      <div>

        <h2 className="text-center">Жалобы</h2>

        {report.reports?.length === 0 && (
          <div className="text-center text-bg-danger">
            Нет жалоб
          </div>
        )}

        <InfiniteScroll
          dataLength={report.reports?.length}
          next={nextReports}
          hasMore={!report?.last}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Все жалобы загружены</b>
            </p>
          }
        >
          {report.reports?.map((reportEl) => (
            <div className="card mb-3 p-3">

              {reportEl.video !== null ? (<div>
                <p>Видео</p>
                <a href={"/video/" + reportEl.video.id}>
                  <img className="card-img-top" src={"http://localhost:8080/pictures/" + reportEl.video.preview_path} alt="..." />
                </a>
              </div>) : null}


              {reportEl.user !== null ? <div>
                <p>Пользователь</p>
                <img style={{ width: "200px", height: "200px" }} src={reportEl.user.avatar_path !== null ? ("localhost:8080/pictures/" + reportEl.user.avatar_path) : ("/default-avatar.png")} className="card-img-top" alt="..." />
              </div> : null}

              <div className="card-body">
                <h5 className="card-title">
                  Жалоба на
                  {reportEl.user !== null ? (<React.Fragment> Пользователя: <a className="text-decoration-none fs-4" href={"/user/" + reportEl.user.id}>{reportEl.user.login}</a>  </React.Fragment>) : null}
                  {reportEl.video !== null ? (<span className="text-bg-secondary"> Видео:  {reportEl.video.name} </span>) : null}
                </h5>
                <p className="card-text">Описание жалобы: {reportEl.message}</p>

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
