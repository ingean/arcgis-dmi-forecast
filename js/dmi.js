import WMSLayer from 'https://js.arcgis.com/4.27/@arcgis/core/layers/WMSLayer.js'
import TimeSlider from 'https://js.arcgis.com/4.27/@arcgis/core/widgets/TimeSlider.js'


const urlAPI = 'https://high-plating-184911.appspot.com/'

const waveTimes = ['2023-09-15T03:00:00Z','2023-09-15T04:00:00Z','2023-09-15T05:00:00Z','2023-09-15T06:00:00Z','2023-09-15T07:00:00Z','2023-09-15T08:00:00Z','2023-09-15T09:00:00Z','2023-09-15T10:00:00Z','2023-09-15T11:00:00Z','2023-09-15T12:00:00Z','2023-09-15T13:00:00Z','2023-09-15T14:00:00Z','2023-09-15T15:00:00Z']


export const getTimeDimension = async () => {
  let url = 'https://public-wms.met.no/verportal/verportal.map?request=GetCapabilities&service=WMS&version=1.3.0'
  //let url = 'https://high-plating-184911.appspot.com/forecasts/dmi/maps/capabilities'

  const layer = new WMSLayer({url})
  await layer.load();
  return layer.dimensions.find((dimension) => dimension.name === "time")
}

export const waveLayer = () => {
  return new WMSLayer({
    url: `${urlAPI}forecasts/dmi/maps`,
    sublayers: [
      {
        name: "wave_eu"
      }
    ]
  });
}

const getDates = () => {
  return waveTimes.map(s => new Date(s))
}

export const initTimeSlider = async (view) => {
  //const timeDimension = await getTimeDimension()
  //const dates = timeDimension.extent; // This time dimension is expressed as an array of dates.
  
  const dates = getDates()
  const start = dates[0]; // Get the first and earliest date
  const end = dates[dates.length -1]; // Get last date
  const timeSlider = new TimeSlider({
    container: "timeSliderDiv",
    view: view,
    mode: "instant",
    timeVisible: true,
    loop: true,
    fullTimeExtent: { // The TimeSlider UI will span all dates
      start,
      end
    },
    stops: {
      dates // The TimeSlider thumb will snap exactly to each valid date
    }
  })
}


