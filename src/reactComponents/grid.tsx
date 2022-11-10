import * as React from 'react';
import { Component } from 'react';


class Grid extends React.Component {

    render() { 
        return ( 
            <div className="container">
  <div className="row">
    <div className="col-sm outline">
      <button className="btn m-2 btn-primary tile">Spot</button>
    </div>
    <div className="col-sm outline">
      <button className="btn m-2 btn-primary tile">Spot</button>
    </div>
    <div className="col-sm outline">
      <button className="btn m-2 btn-primary tile">Spot</button>
    </div>
  </div>
  <div className="row">
    <div className="col-sm outline">
      <button className="btn m-2 btn-primary tile">Spot</button>
    </div>
    <div className="col-sm outline">
      <button className="btn m-2 btn-primary tile">Spot</button>
    </div>
    <div className="col-sm outline">
      <button className="btn m-2 btn-primary tile">Spot</button>
    </div>
  </div>
  <div className="row">
    <div className="col-sm outline">
      <button className="btn m-2 btn-primary tile">Spot</button>
    </div>
    <div className="col-sm outline">
      <button className="btn m-2 btn-primary tile">Spot</button>
    </div>
    <div className="col-sm outline">
      <button className="btn m-2 btn-primary tile">Spot</button>
    </div>
  </div>
</div>
         );
    }
}
 
export default Grid;