"use client"

import { useState } from "react";

export default function Page() {
  const [refreshToken, setRefreshToken] = useState('');
    
  return (
    <>
      <div className="flex flex-wrap gap-2 relative">
        <div className="w-full relative">
          <button 
            className="inline-flex gap-2 px-4 py-1.5 text-xs text-slate-600 border border-slate-500 cursor-pointer hover:bg-slate-100"
            onClick={() => {
              location.href = '/login'
            }}
            >
            카카오 로그인 하기
          </button>
        </div>
        <div className="w-full relative">
          <input type="text" className="inline-flex border border-slate-500" value={refreshToken} onChange={e => setRefreshToken(e.target.value)} /> 
        </div>
        <div className="w-full relative">
          <button 
            className="inline-flex gap-2 px-4 py-1.5 text-xs text-slate-600 border border-slate-500 cursor-pointer hover:bg-slate-100"
            onClick={() => {
              fetch(`/refresh`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
              }).then(async res => {
                const resBody = await res.json();
                return resBody;
              });
            }}
            >
            refresh 하기
          </button>
        </div>
      </div>
    </>
  );
}