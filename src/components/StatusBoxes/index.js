import "./style.css"

function StatusBox(props) {
  let healthy = props.status.success
  let message = ""
  if(healthy){
    message = <p className={`statusBox__health ${healthy ? "": "--isDown"}`}>Healthy</p>
  }
  else {
    message = 
    <p className={`statusBox__health ${healthy ? "": "--isDown"}`}>OUTAGE</p> 
  }

  return (
    
    <div className="statusBox">
        <div className="statusBox__head">
          <h1 className="statusBox__title">{props.name}</h1>
        </div>
        <div className="statusBox__body">
          <p className={`statusBox__health ${healthy ? "": "--isDown"}`}>{message}</p>
          <p className={`statusBox__hostname ${healthy ? "": "--isDown"}`}>{healthy ? props.status.hostname : "403 forbidden"}</p>
          <p className="statusBox__time">{props.status.time}</p>
        </div>
    </div>
      
  )
}


function StatusBoxes({status}){
  return (
    <div className="statusBoxes">
      {Object.keys(status).map((key)=>{
            return (
              <StatusBox name={key} status={status[key]}/>
            )
          })}
    </div>
  );
}

export default StatusBoxes