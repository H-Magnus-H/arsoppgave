<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FAQ - FishWar</title>
    <!-- Include Tailwind CSS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sixtyfour&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-900 text-white">
<div class="container">
    <div class="max-w-4xl w-full bg-gray-800 p-8 rounded-lg">
        <h1 class="text-3xl font-bold mb-4 text-yellow-500">FishWar FAQ</h1>
        <h1 class="text-2xl font-bold mb-4">Trykk på ditt spørsmål</h1>
        
        <div class="accordion">
            <!-- FAQ Item 1 -->
            <div class="accordion-item">
                <input type="checkbox" id="faq-item-1" class="accordion-toggle">
                <label for="faq-item-1" class="accordion-title">Hva er FishWar?</label>
                <div class="accordion-content">
                    <p>FishWar er et enspiller online spill hvor spillere kjemper mot andre fisker og konkurrerer om å ha den beste poengsummen.</p>
                </div>
            </div>

            <!-- FAQ Item 2 -->
            <div class="accordion-item">
                <input type="checkbox" id="faq-item-2" class="accordion-toggle">
                <label for="faq-item-2" class="accordion-title">Hvordan spiller jeg?</label>
                <div class="accordion-content">
                    <p>For å spille FishWar, trenger du bare å opprette en konto, og deretter kan du delta i kamper med andre fisker.</p>
                </div>
            </div>

            <!-- FAQ Item 3 -->
            <div class="accordion-item">
                <input type="checkbox" id="faq-item-3" class="accordion-toggle">
                <label for="faq-item-3" class="accordion-title">Kan jeg tilpasse mine fiskekrigere?</label>
                <div class="accordion-content">
                    <p>Nei, du kan ikke tilpasse evnene eller utseendet til dine fiskekrigere.</p>
                </div>
            </div>

            <!-- FAQ Item 4 -->
            <div class="accordion-item">
                <input type="checkbox" id="faq-item-4" class="accordion-toggle">
                <label for="faq-item-4" class="accordion-title">Hvordan tjener jeg poeng?</label>
                <div class="accordion-content">
                    <p>Du tjener poeng ved å vinne kamper mot andre spillere og utføre ulike oppgaver i spillet.</p>
                </div>
            </div>

            <!-- FAQ Item 5 -->
            <div class="accordion-item">
                <input type="checkbox" id="faq-item-5" class="accordion-toggle">
                <label for="faq-item-5" class="accordion-title">Er FishWar gratis å spille?</label>
                <div class="accordion-content">
                    <p>Ja, FishWar er gratis å spille, men det kan være tilgjengelige kjøp inne i spillet for å få tilgang til visse funksjoner eller ressurser.</p>
                </div>
            </div>
            <!-- Add more FAQ items as needed -->
        </div>
        <div>
            <h1 class="text-2xl font-bold mb-4">Flere spørsmål? Se video under</h1>
            <video controls>
            <source src="Arsoppgave2_FishWar.mp4" type="video/mp4">
            Your browser does not support the video tag.    
        </video>
        </div>
        
        <a href="index.php"><button id="indexknapp" class="steampunk-button">Login</button></a>
        
    </div>
</div>
</body>

</html>
