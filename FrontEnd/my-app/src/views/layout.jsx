
import React, { useEffect, useState } from 'react'
import etudiantsservice from '../services/etudiantsservice';
import enseignantsservice from '../services/enseignantsservice';
import sallesservice from '../services/sallesservice';
import seanceservice from '../services/seanceservice';


const Layout = () => {
  const [etudiants,setEtudiant]=useState({})
  const [enseignant,setEnseignant]=useState({})
  const [salles,setSalle]=useState({})
  const [seance,setSeance]=useState({})
  const [affiche,setAffiche]=useState(false)

  const getAllStudents=()=>{
    etudiantsservice.GetALL().then((res)=>{
      console.log(res);
      setEtudiant(res.data.data)
      setAffiche(true)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAllStudents()
  },[])

  const getAllEnseignants=()=>{
    enseignantsservice.GetALL().then((res)=>{
      console.log(res);
      setEnseignant(res.data.data)
      setAffiche(true)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAllEnseignants()
  },[])  

  const getAllSalles=()=>{
    sallesservice.GetALL().then((res)=>{
      console.log(res);
      setSalle(res.data.data)
      setAffiche(true)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAllSalles()
  },[])  

  const getAllSeances=()=>{
    seanceservice.GetALL().then((res)=>{
      console.log(res);
      setSeance(res.data.data)
      setAffiche(true)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAllSeances()
  },[])  

  return (
<div>
    <div className="container-fluid pt-4 px-4">
    <div className="row g-4">
      <div className="col-sm-6 col-xl-3">
        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-line fa-3x text-primary" />
          <div className="ms-3">
            <p className="mb-2">Nos Etudiants</p>
            <h6 className="mb-0">{etudiants?.length}</h6>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-3">
        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-bar fa-3x text-primary" />
          <div className="ms-3">
            <p className="mb-2">Nos Enseignants</p>
            <h6 className="mb-0">{enseignant?.length}</h6>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-3">
        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-area fa-3x text-primary" />
          <div className="ms-3">
            <p className="mb-2">Salles</p>
            <h6 className="mb-0">{salles?.length}</h6>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-3">
        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-pie fa-3x text-primary" />
          <div className="ms-3">
            <p className="mb-2">Seances</p>
            <h6 className="mb-0">{seance?.length}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="container-fluid pt-4 px-4">
    <div className="row g-4">
      <div className="col-sm-12 col-xl-6">
        <div className="bg-light text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Worldwide Sales</h6>
            <a href>Show All</a>
          </div>
          <canvas id="worldwide-sales" />
        </div>
      </div>
      <div className="col-sm-12 col-xl-6">
        <div className="bg-light text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Salse &amp; Revenue</h6>
            <a href>Show All</a>
          </div>
          <canvas id="salse-revenue" />
        </div>
      </div>
    </div>
  </div>
 
  <div className="container-fluid pt-4 px-4">
    <div className="bg-light text-center rounded p-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h6 className="mb-0">Recent Salse</h6>
        <a href>Show All</a>
      </div>
      <div className="table-responsive">
        <table className="table text-start align-middle table-bordered table-hover mb-0">
          <thead>
            <tr className="text-dark">
              <th scope="col"><input className="form-check-input" type="checkbox" /></th>
              <th scope="col">Date</th>
              <th scope="col">Invoice</th>
              <th scope="col">Customer</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input className="form-check-input" type="checkbox" /></td>
              <td>01 Jan 2045</td>
              <td>INV-0123</td>
              <td>Jhon Doe</td>
              <td>$123</td>
              <td>Paid</td>
              <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
            </tr>
            <tr>
              <td><input className="form-check-input" type="checkbox" /></td>
              <td>01 Jan 2045</td>
              <td>INV-0123</td>
              <td>Jhon Doe</td>
              <td>$123</td>
              <td>Paid</td>
              <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
            </tr>
            <tr>
              <td><input className="form-check-input" type="checkbox" /></td>
              <td>01 Jan 2045</td>
              <td>INV-0123</td>
              <td>Jhon Doe</td>
              <td>$123</td>
              <td>Paid</td>
              <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
            </tr>
            <tr>
              <td><input className="form-check-input" type="checkbox" /></td>
              <td>01 Jan 2045</td>
              <td>INV-0123</td>
              <td>Jhon Doe</td>
              <td>$123</td>
              <td>Paid</td>
              <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
            </tr>
            <tr>
              <td><input className="form-check-input" type="checkbox" /></td>
              <td>01 Jan 2045</td>
              <td>INV-0123</td>
              <td>Jhon Doe</td>
              <td>$123</td>
              <td>Paid</td>
              <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div className="container-fluid pt-4 px-4">
    <div className="row g-4">
      <div className="col-sm-12 col-md-6 col-xl-4">
        <div className="h-100 bg-light rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h6 className="mb-0">Messages</h6>
            <a href>Show All</a>
          </div>
          <div className="d-flex align-items-center border-bottom py-3">
            <img className="rounded-circle flex-shrink-0" src="img/user.jpg" alt style={{width: 40, height: 40}} />
            <div className="w-100 ms-3">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-0">Jhon Doe</h6>
                <small>15 minutes ago</small>
              </div>
              <span>Short message goes here...</span>
            </div>
          </div>
          <div className="d-flex align-items-center border-bottom py-3">
            <img className="rounded-circle flex-shrink-0" src="img/user.jpg" alt style={{width: 40, height: 40}} />
            <div className="w-100 ms-3">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-0">Jhon Doe</h6>
                <small>15 minutes ago</small>
              </div>
              <span>Short message goes here...</span>
            </div>
          </div>
          <div className="d-flex align-items-center border-bottom py-3">
            <img className="rounded-circle flex-shrink-0" src="img/user.jpg" alt style={{width: 40, height: 40}} />
            <div className="w-100 ms-3">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-0">Jhon Doe</h6>
                <small>15 minutes ago</small>
              </div>
              <span>Short message goes here...</span>
            </div>
          </div>
          <div className="d-flex align-items-center pt-3">
            <img className="rounded-circle flex-shrink-0" src="img/user.jpg" alt style={{width: 40, height: 40}} />
            <div className="w-100 ms-3">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-0">Jhon Doe</h6>
                <small>15 minutes ago</small>
              </div>
              <span>Short message goes here...</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-md-6 col-xl-4">
        <div className="h-100 bg-light rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Calender</h6>
            <a href>Show All</a>
          </div>
          <div id="calender" />
        </div>
      </div>
      <div className="col-sm-12 col-md-6 col-xl-4">
        <div className="h-100 bg-light rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">To Do List</h6>
            <a href>Show All</a>
          </div>
          <div className="d-flex mb-2">
            <input className="form-control bg-transparent" type="text" placeholder="Enter task" />
            <button type="button" className="btn btn-primary ms-2">Add</button>
          </div>
          <div className="d-flex align-items-center border-bottom py-2">
            <input className="form-check-input m-0" type="checkbox" />
            <div className="w-100 ms-3">
              <div className="d-flex w-100 align-items-center justify-content-between">
                <span>Short task goes here...</span>
                <button className="btn btn-sm"><i className="fa fa-times" /></button>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center border-bottom py-2">
            <input className="form-check-input m-0" type="checkbox" />
            <div className="w-100 ms-3">
              <div className="d-flex w-100 align-items-center justify-content-between">
                <span>Short task goes here...</span>
                <button className="btn btn-sm"><i className="fa fa-times" /></button>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center border-bottom py-2">
            <input className="form-check-input m-0" type="checkbox" defaultChecked />
            <div className="w-100 ms-3">
              <div className="d-flex w-100 align-items-center justify-content-between">
                <span><del>Short task goes here...</del></span>
                <button className="btn btn-sm text-primary"><i className="fa fa-times" /></button>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center border-bottom py-2">
            <input className="form-check-input m-0" type="checkbox" />
            <div className="w-100 ms-3">
              <div className="d-flex w-100 align-items-center justify-content-between">
                <span>Short task goes here...</span>
                <button className="btn btn-sm"><i className="fa fa-times" /></button>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center pt-2">
            <input className="form-check-input m-0" type="checkbox" />
            <div className="w-100 ms-3">
              <div className="d-flex w-100 align-items-center justify-content-between">
                <span>Short task goes here...</span>
                <button className="btn btn-sm"><i className="fa fa-times" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Layout