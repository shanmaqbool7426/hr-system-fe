import React from 'react' 

const TicketsStats = () => { 
    const data = [
        { color: "bg-themeOrange", text: "Total Tickets", tickets: "120" },
        { color: "bg-themePurple", text: "Open Tickets", tickets: "60" },
        { color: "bg-themeSuccessLight", text: "Inprogress Tickets", tickets: "40" },
        { color: "bg-themeDanger", text: "Closed Tickets", tickets: "60" },

    ]
    return (
        <div className="grid custom__grid gap-6 mb-6">
            {data.map((ele, i) => (
                <div key={i} className='zt-card !p-0 overflow-hidden'>
                    <h2 className={`text-2xl text-white text-center p-2 m-0 ${ele.color}`}>{ele.text}</h2>
                    <div className='p-7 text-center text-4xl font-bold'>{ele.tickets}</div>
                </div>
            ))}
        </div>
    )
}

export default TicketsStats
