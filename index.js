$(document).ready(function(){

    $('#menu-bar').click(function(){
        $(this).toggleClass('fa-times');
        $('.header .flex .navbar').toggleClass('nav-toggle');
    });

    $(window).on('load scroll',function(){

        $('#menu-bar').removeClass('fa-times');
        $('.header .flex .navbar').removeClass('nav-toggle');

        $('section').each(function(){

            let top = $(window).scrollTop();
            let height = $(this).height();
            let id = $(this).attr('id');
            let offset = $(this).offset().top - 150;

            if(top > offset && top < offset + height){
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }

        });

    });

    $('.menu .list .btn').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        let src = $(this).attr('data-src');
        $('.menu .row .image img').attr('src',src);
    });

});

async function search() {
    const searchInput = document.getElementById('searchInput').value;
    const apiUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchInput}&json=1`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      displayResults(data.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function displayResults(products) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (products.length === 0) {
      resultsContainer.innerHTML = 'No results found.';
      return;
    }

    const ul = document.createElement('ul');
    products.forEach(product => {
      const li = document.createElement('li');
      li.textContent = product.product_name || 'Unnamed product';
      ul.appendChild(li);
    });

    resultsContainer.appendChild(ul);
  }
