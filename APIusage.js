//const { Chart } = require("chart.js");

//Defining the NASA API link and storing it
let nasa_url_globalAPI = 'https://eonet.gsfc.nasa.gov/api/v3/events';

//Defining canvas containers instances
let canvas_cont1 = document.getElementById('chart_1');
let canvas_cont2 = document.getElementById('chart_2');
let canvas_cont3 = document.getElementById('chart_3');

//Defining chart canvas
let chart_canvas1 = document.getElementById('chartf1');
let chart_canvas2 = document.getElementById('chartf2');
let chart_canvas3 = document.getElementById('chartf3');

//Defining natural event selection reference
let chart_selector = document.getElementById('q_input');

//Defining canvas selection reference
let canvas_selector = document.getElementById('canvas_selector');

//Defining button reference
let draw_b = document.getElementById('draw_b');

const render_chart = async (event_id_query, chart_holder) => {
    const API_global_url = await fetch(nasa_url_globalAPI);
    const extracted_data = await API_global_url.json();
    let NASA_events = extracted_data.events;
    NASA_events.forEach(NASA_events_element => {
        if (event_id_query === NASA_events_element.id) {
            let NASA_API_geometry = NASA_events_element.geometry;
            let labels_x_axis = [];
            let labels_y_axis = [];
            NASA_API_geometry.forEach(geom_elem => {
                if (geom_elem.type === 'Point' && geom_elem.magnitudeValue === null) {
                    console.warn('No hay datos graficables, se mostrará únicamente un gráfico vacío titulado');
                } else {
                    labels_x_axis.push(geom_elem.date);
                    labels_y_axis.push(geom_elem.magnitudeValue);
                }
            })
            let chart = new Chart(chart_holder, {
                type: 'bar',
                data: {
                    labels: labels_x_axis,
                    datasets: [{
                        label: NASA_events_element.title,
                        data: labels_y_axis,
                        backgroundColor: [
                            'rgba(220, 88, 77, 1)',
                            'rgba(255, 120, 70, 1)',
                            'rgba(120, 200, 55, 1)',
                            'rgba(90, 122, 89, 1)'
                        ]
                    }]
                }
            })
        }
    });
}

draw_b.addEventListener('click', () => {
    if (canvas_selector.value === '1') {
        let ctx1 = chart_canvas1.getContext('2d');
        ctx1.strokeStyle = '#f212aa'
        ctx1.stroke();
        render_chart(chart_selector.value, chart_canvas1);
    }else if (canvas_selector.value === '2'){
        let ctx2 = chart_canvas2.getContext('2d');
        ctx2.strokeStyle = '#f212aa'
        ctx2.stroke();
        render_chart(chart_selector.value, chart_canvas2);
    }else if (canvas_selector.value === '3'){
        let ctx3 = chart_canvas3.getContext('2d');
        ctx3.strokeStyle = '#f212aa'
        ctx3.stroke();
        render_chart(chart_selector.value, chart_canvas3);
    }
});

const populateSelection = () => {
    fetch(nasa_url_globalAPI)
        .then(api_response => api_response.json())
        .then(iterable_data => {
            let event_array = [];
            iterable_data.events.forEach(event_element => {
                let event_obj = {
                    id: '',
                    name: ''
                };
                event_obj.id = event_element.id;
                event_obj.name = event_element.title;
                event_array.push(event_obj);
            })
            event_array.forEach(event_object => {
                chart_selector.innerHTML = chart_selector.innerHTML + `
            <option value = ${event_object.id}>${event_object.name}</option>`;
            });
        })
}
                                                    
populateSelection();