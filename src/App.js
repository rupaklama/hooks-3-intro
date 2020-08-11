import React, { useState, useEffect } from 'react';

const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
}
function App() {

  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  // destructuring location
  const [{ latitude, longitude, speed }, setLocation] = useState(initialLocationState);

  // navigator.geolocation don't have unmount option by default
  // creating a variable to reassign,
  // when our component is mounted, this value will be true
  let mounted = true;
  
  
  useEffect(() => {
    console.log('I only run once!')
    // updating page title in the tab
    document.title = `You have clicked ${count} times`;
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    navigator.geolocation.getCurrentPosition(handleGeolocation)

    // watch for any changes in location
    // returns identifier - id
    const watchId = navigator.geolocation.watchPosition(handleGeolocation)

    // clean up func to remove 'movemove' listener
    // On first render, first arg arrow func gets call 
    // On second rerender, cleanup function gets call first automatically to remove any side effects, 
    // & after that first arg arrow func gets called again - starting same process again, repeating over & over…
    return () => {
      console.log('CLEANUP time!')
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      navigator.geolocation.clearWatch(watchId)
      // eslint-disable-next-line 
      mounted = false;
    }
    // eslint-disable-next-line
  }, [count]);

  const handleGeolocation = event => {
    // navigator.geolocation don't have unmount option by default
    if (mounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed
      })
    }
    
  }

  const handleMouseMove = event => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY
    })
  }

  const handleOnline = () => setStatus(true)
  
  const handleOffline = () => setStatus(false)
  
  const incrementCount = () => setCount(count + 1)
  
  const toggleLight = () => setIsOn(!isOn)
  

  return (
    <div>
      <h2>Counter : {count}</h2>
      <button onClick={incrementCount}>Click me</button>

      <hr />
      <h2>Toggle Light</h2>
      <div 
        style={{
          height: '50px',
          width: '50px',
          background: isOn ? "blue" : "red"
        }}

        onClick={toggleLight}
        >
      </div>

      <hr />
      <h2>Mouse Position</h2>
      {JSON.stringify(mousePosition, null, 2)}
      
      <hr />
      <h2>Network Status</h2>
      <p> You are { status ? 'online' : 'offline' }</p>

      <hr />
      <h2>Geolocation</h2>
      <p>Latitude is {latitude}</p>
      <p>Longitude is {longitude}</p>
      <p>Your speed is {speed ? speed : '0'}</p>
    </div>
  );
}

export default App;
