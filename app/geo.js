const { geo } = require('./config')
const turf = require('@turf/turf')
const units = 'miles'

const getBoundingBox = () => {
  const { longitude, latitude, distance } = geo
  const point = turf.point([longitude, latitude])
  const bbox = getBboxFromPoint(point, distance)

  return {
    lamin: bbox[0],
    lomin: bbox[1],
    lamax: bbox[2],
    lomax: bbox[3]
  }
}

const getBboxFromPoint = (point, distance) => {
  const sw = turf.destination(point, distance, 225, { units })
  const ne = turf.destination(point, distance, 45, { units })
  return turf.bbox(turf.featureCollection([sw, ne]))
}

module.exports = {
  getBoundingBox
}
