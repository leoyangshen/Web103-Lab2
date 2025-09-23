const renderGifts = async () => {
    
    const mainContent = document.getElementById('main-content')
    
    // Add a try...catch block to handle the error
    try {
        const response = await fetch('/gifts')

        // Check if the response was successful
        if (!response.ok) {
            // If the response is not okay, parse the error message
            const errorData = await response.json()
            throw new Error(errorData.error || 'Unknown error occurred')
        }

        const data = await response.json()

        if (data && data.length > 0) {
            data.map(gift => {
                const card = document.createElement('div')
                card.classList.add('card')
    
                const topContainer = document.createElement('div')
                topContainer.classList.add('top-container')
    
                const bottomContainer = document.createElement('div')
                bottomContainer.classList.add('bottom-container')
    
                topContainer.style.backgroundImage = `url(${gift.image})`
    
                const name = document.createElement('h3')
                name.textContent = gift.name
                bottomContainer.appendChild(name)
    
                const pricePoint = document.createElement('p')
                pricePoint.textContent = 'Price: ' + gift.pricePoint
                bottomContainer.appendChild(pricePoint)
    
                const audience = document.createElement('p')
                audience.textContent = 'Great For: ' + gift.audience
                bottomContainer.appendChild(audience)
    
                const link = document.createElement('a')
                link.textContent = 'Read More >'
                link.setAttribute('role', 'button')
                link.href = `/gifts/${gift.id}`
                bottomContainer.appendChild(link)
    
                card.appendChild(topContainer)
                card.appendChild(bottomContainer) 
                mainContent.appendChild(card)
            })
        } else {
            const message = document.createElement('h2')
            message.textContent = 'No Gifts Available 😞'
            mainContent.appendChild(message)
        }
    } catch (error) {
        // Log the error to the console for debugging
        console.error('Error fetching gifts:', error.message)
        
        // Display a user-friendly error message on the page
        const errorMessage = document.createElement('h2')
        errorMessage.textContent = `Error: ${error.message}`
        mainContent.appendChild(errorMessage)
    }
}

const requestedUrl = window.location.href.split('/').pop()
if (requestedUrl) {
    window.location.href = '../404.html'
} else {
    renderGifts()
}
