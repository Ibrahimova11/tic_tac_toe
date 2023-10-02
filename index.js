let cells = document.querySelectorAll('.cell') //.cell sınıfına sahip tüm elementleri seçer ve bu elementleri bir NodeList'ten bir diziye dönüştürür.
cells = Array.from(cells)

let currentPlayer = "X" //currentPlayer değişkeni, oyunun şu anki oyuncusunu temsil eder ve "X" ile başlatılır.

let winningCombinations = [   //winningCombinations, oyunun kazanan kombinasyonlarını tanımlar. Bu kombinasyonlar, oyunun hangi hücrelerin kazanan bir durumu temsil ettiğini belirlemek için kullanılacak.
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function checkForWinner(){  //checkForWinner işlevi, kazananın kontrolünü yapar. 
    winningCombinations.forEach(function(combination){  //winningCombinations içindeki her kombinasyon için döngüyü dolaşır ve her bir kombinasyonun tüm hücrelerinin şu anki oyuncunun işareti (X veya O) ile doldurulup doldurulmadığını kontrol eder. Bir oyuncu kazandıysa,
        let check = combination.every(idx => cells[idx].innerText.trim() == currentPlayer)
        if(check){
            highlightCells(combination) //highlightCells işlevini çağırarak kazanan kombinasyondaki hücreleri vurgular.
        }
    })
}

function highlightCells(combination){ //highlightCells işlevi, kazanan kombinasyondaki hücreleri vurgular. Her bir hücre, classList.add yöntemi kullanılarak "highlight" sınıfını eklenir.
    combination.forEach(function(idx){
        cells[idx].classList.add("highlight")
    })
}

cells.forEach(function(cell){  //cells dizisindeki her bir hücre için bir olay dinleyici ekler. Bu olay dinleyici, bir hücreye tıklama olduğunda çalışır. Önce tıklanan hücrenin boş olup olmadığını kontrol eder. Boşsa, şu anki oyuncunun işaretini (X veya O) ekler, checkForWinner işlemini çağırarak kazananı kontrol eder ve sıradaki oyuncuyu değiştirir. Eğer hücre dolu ise, herhangi bir şey yapmaz ve sırayı değiştirmez.
    cell.addEventListener('click', function(){
        if(cell.innerText.trim() != "") return
        cell.innerText = currentPlayer
        checkForWinner()
        currentPlayer = currentPlayer == "X" ? "O" : "X"
    })
})