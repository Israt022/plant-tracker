let thrivingList = [];
let strugglingList = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let thrivingCount = document.getElementById('thrivingCount');
let strugglingCount = document.getElementById('strugglingCount');

// button filter 
const allFilterButton = document.getElementById('all-filter-btn');
const thrivingFilterButton = document.getElementById('thriving-filter-btn');
const strugglingFilterButton = document.getElementById('struggling-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filter-section');


/*--Plant Tracker Count--*/
function calculateCount(){
    total.innerText = allCardSection.children.length;
    thrivingCount.innerText = thrivingList.length;
    strugglingCount.innerText = strugglingList.length;
}

calculateCount();

function toggleStyle(id){
    // adding gray button for all button
    allFilterButton.classList.add('btn-soft');
    thrivingFilterButton.classList.add('btn-soft');
    strugglingFilterButton.classList.add('btn-soft');

    // remove black button for all button
    allFilterButton.classList.remove('btn-neutral');
    thrivingFilterButton.classList.remove('btn-neutral');
    strugglingFilterButton.classList.remove('btn-neutral');


    const selected = document.getElementById(id);
    currentStatus = id;

    // adding black button for current pressing button
    selected.classList.remove('btn-soft');
    selected.classList.add('btn-neutral');

    if(id == 'thriving-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderThriving();
    }else if(id == 'all-filter-btn'){
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }else if(id == 'struggling-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderStruggling();
    }
}

mainContainer.addEventListener('click',function(event){
    if(event.target.classList.contains('thriving-btn')){
        const parentNode = event.target.parentNode.parentNode;
        
        const plantName = parentNode.querySelector('.plantName').innerText;
        const latinName = parentNode.querySelector('.latinName').innerText;
        const light = parentNode.querySelector('.light').innerText;
        const water = parentNode.querySelector('.water').innerText;
        const status = parentNode.querySelector('.Status').innerText;
        const notes = parentNode.querySelector('.notes').innerText;

        parentNode.querySelector('.Status').innerText = 'Thrive';

        const cardInfo = {
            plantName,
            latinName,
            light,
            water,
            status : 'Thrive',
            notes
        };

        const plantExist = thrivingList.find(item => item.plantName == cardInfo.plantName);
        
        if(!plantExist){
            thrivingList.push(cardInfo);
        }

        strugglingList = strugglingList.filter(item => item.plantName != cardInfo.plantName);

        // after remove rerender the html
        if (currentStatus == 'struggling-filter-btn') {
            renderStruggling()
        }

         calculateCount()

    }else if(event.target.classList.contains('struggling-btn')){
        const parentNode = event.target.parentNode.parentNode;
        
        const plantName = parentNode.querySelector('.plantName').innerText;
        const latinName = parentNode.querySelector('.latinName').innerText;
        const light = parentNode.querySelector('.light').innerText;
        const water = parentNode.querySelector('.water').innerText;
        const status = parentNode.querySelector('.Status').innerText;
        const notes = parentNode.querySelector('.notes').innerText;

        parentNode.querySelector('.Status').innerText = 'Struggle';

        const cardInfo = {
            plantName,
            latinName,
            light,
            water,
            status : 'Struggle',
            notes
        };

        const plantExist = strugglingList.find(item => item.plantName == cardInfo.plantName);
        
        if(!plantExist){
            strugglingList.push(cardInfo);
        }

        thrivingList = thrivingList.filter(item => item.plantName != cardInfo.plantName);

        // after remove rerender the html
        if (currentStatus == "thriving-filter-btn") {
            renderThriving();
        }
        calculateCount()
    }
    
    
    console.log(event.target.classList.contains('thriving-btn'));
})

function renderThriving(){
    filterSection.innerHTML = "";

    for (const thrive of thrivingList) {
        console.log("thrive ->", thrive);
        const div = document.createElement('div');
        div.className = ("card flex flex-row justify-between items-start w-full p-8 border mt-5 mb-4");
        div.innerHTML = `
            <!--Main part-1 -->
            <div class="space-y-4">
                <!--part - 1-->
                <div>
                    <h3 class="plantName text-3xl">${thrive.plantName}</h3>
                    <p class="latinName">${thrive.latinName}</p>
                </div>

                <!--part- 2 -->
                <div class="flex gap-4">
                    <p class="light bg-gray-300 text-gray-600 p-3 py-1 rounded-sm">${thrive.light}</p>
                    <p class="water bg-gray-300 text-gray-600 p-3 py-1 rounded-sm">${thrive.water}</p>
                </div>

                <!--part-3 -->
                <p class="Status border border-success px-4 py-2 rounded inline-block">${thrive.status}</p>
                <p class="notes">
                    ${thrive.notes}
                </p>

                <div>
                    <button class="thriving-btn btn btn-outline btn-success">Thrive</button>
                    <button class="struggling-btn btn btn-outline btn-error">Struggle</button>
                </div>
            </div>

            <!--Main part-2 -->
            <div>
                <button class="btn-delete btn btn-outline btn-error">Delete</button>
            </div>
         `
         filterSection.appendChild(div);
    }

}
function renderStruggling(){
    filterSection.innerHTML = "";

    for (const struggle of strugglingList) {
        console.log("thrive ->", struggle);
        const div = document.createElement('div');
        div.className = ("card flex flex-row justify-between items-start w-full p-8 border mt-5 mb-4");
        div.innerHTML = `
            <!--Main part-1 -->
            <div class="space-y-4">
                <!--part - 1-->
                <div>
                    <h3 class="plantName text-3xl">${struggle.plantName}</h3>
                    <p class="latinName">${struggle.latinName}</p>
                </div>

                <!--part- 2 -->
                <div class="flex gap-4">
                    <p class="light bg-gray-300 text-gray-600 p-3 py-1 rounded-sm">${struggle.light}</p>
                    <p class="water bg-gray-300 text-gray-600 p-3 py-1 rounded-sm">${struggle.water}</p>
                </div>

                <!--part-3 -->
                <p class="Status border border-success px-4 py-2 rounded inline-block">${struggle.status}</p>
                <p class="notes">
                    ${struggle.notes}
                </p>

                <div>
                    <button class="thriving-btn btn btn-outline btn-success">Thrive</button>
                    <button class="struggling-btn btn btn-outline btn-error">Struggle</button>
                </div>
            </div>

            <!--Main part-2 -->
            <div>
                <button class="btn-delete btn btn-outline btn-error">Delete</button>
            </div>
         `
         filterSection.appendChild(div);
    }

}