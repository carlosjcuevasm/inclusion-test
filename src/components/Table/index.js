import "./style.css";

function Table({ status }) {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Success</th>
            <th>Message</th>
            <th>Hostname</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(status).map((key) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  {status[key].success ? (
                    <span role="img" aria-label="Healthy">
                      ✅
                    </span>
                  ) : (
                    <span role="img" aria-label="Down">
                      ❌
                    </span>
                  )}
                </td>
                <td>{status[key].message}</td>
                <td>{status[key].hostname}</td>
                <td>{status[key].time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
