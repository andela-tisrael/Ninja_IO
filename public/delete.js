var sdelete = document.getElementById('deleted');


sdelete.addEventListener('click', () => {

    var deleteAll = prompt('Are you sure you want to delete all the collections? reply with YES or cancel');
   if (deleteAll ==='YES' || deleteAll ==='yes'){

        console.log("Database Cleared");
        fetch('quotes', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }

        })

        window.location.reload(true);

    }
});
