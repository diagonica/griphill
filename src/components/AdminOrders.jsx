import React, { useEffect, useState } from 'react';
import { RefreshCw, LogIn, Truck, CheckCircle2 } from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL || 'https://api.diagonica.com/api';
const money = v => `₹${Number(v || 0).toLocaleString('en-IN')}`;

export default function AdminOrders() {
  const [token,setToken]=useState(()=>localStorage.getItem('griphill_admin_token')||'');
  const [login,setLogin]=useState({usernameOrEmail:'',password:''});
  const [data,setData]=useState({orders:[],summary:null});
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);

  const load=async()=>{
    if(!token)return;
    setLoading(true);setError('');
    try{const r=await fetch(`${API}/griphill/admin/orders`,{headers:{Authorization:`Bearer ${token}`}});const d=await r.json();if(!r.ok||!d.success)throw new Error(d.error||'Unable to load orders.');setData({orders:d.orders||[],summary:d.summary});}
    catch(e){setError(e.message);}
    finally{setLoading(false);}
  };
  useEffect(()=>{load();const id=setInterval(load,15000);return()=>clearInterval(id);},[token]);

  const doLogin=async e=>{e.preventDefault();setError('');try{const r=await fetch(`${API}/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(login)});const d=await r.json();if(!r.ok||!d.success)throw new Error(d.error||'Login failed.');localStorage.setItem('griphill_admin_token',d.token);setToken(d.token);}catch(e){setError(e.message);}};
  const status=async(id,value)=>{try{const r=await fetch(`${API}/griphill/admin/orders/${id}/status`,{method:'PATCH',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({status:value})});const d=await r.json();if(!r.ok||!d.success)throw new Error(d.error||'Status update failed.');load();}catch(e){setError(e.message);}};

  if(!token)return <div className="admin-page"><div className="admin-card"><p className="eyebrow">GRIP HILL / ADMIN</p><h1>Orders dashboard.</h1><form onSubmit={doLogin} className="checkout-form"><label>Username or email<input value={login.usernameOrEmail} onChange={e=>setLogin({...login,usernameOrEmail:e.target.value})} required/></label><label>Password<input type="password" value={login.password} onChange={e=>setLogin({...login,password:e.target.value})} required/></label>{error&&<div className="form-error">{error}</div>}<button className="button button-dark">Sign in <LogIn size={16}/></button></form></div></div>;

  return <div className="admin-page"><div className="admin-header"><div><p className="eyebrow">GRIP HILL / LIVE ORDERS</p><h1>Order dashboard.</h1></div><button className="button button-dark" onClick={load}><RefreshCw size={15}/> {loading?'Refreshing…':'Refresh'}</button></div>{error&&<div className="form-error">{error}</div>}<div className="admin-stats"><div><span>Orders</span><strong>{data.summary?.orders||0}</strong></div><div><span>Successful payments</span><strong>{data.summary?.successful_payments||0}</strong></div><div><span>Paid amount</span><strong>{money(data.summary?.paid_amount)}</strong></div><div><span>Failed payments</span><strong>{data.summary?.failed_payments||0}</strong></div></div><div className="admin-table"><div className="admin-table-head"><span>Order</span><span>Customer</span><span>Amount</span><span>Payment</span><span>Status</span></div>{data.orders.map(o=><div className="admin-row" key={o.id}><div><strong>{o.order_number}</strong><small>{new Date(o.created_at).toLocaleString('en-IN')}</small></div><div><strong>{o.customer_name}</strong><small>{o.customer_email}</small></div><div>{money(o.total_amount)}</div><div><span className={`status-pill ${String(o.payment_status).toLowerCase()}`}>{o.payment_status}</span></div><div><select value={o.status} onChange={e=>status(o.id,e.target.value)}><option>PENDING_PAYMENT</option><option>PAYMENT_FAILED</option><option>PAID</option><option>PROCESSING</option><option>PACKED</option><option>SHIPPED</option><option>OUT_FOR_DELIVERY</option><option>DELIVERED</option><option>CANCELLED</option><option>REFUNDED</option></select>{o.tracking_number&&<small><Truck size={12}/> {o.tracking_number}</small>}</div></div>)}</div><p className="admin-live"><CheckCircle2 size={14}/> Auto-refreshing every 15 seconds. Payment truth is synchronized by Razorpay webhooks.</p></div>;
}
