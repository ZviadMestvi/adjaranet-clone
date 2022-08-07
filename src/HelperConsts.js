export const filmsInGeorgianURL =
  'https://api.adjaranet.com/api/v1/movies?page=1&per_page=20&filters%5Blanguage%5D=GEO&filters%5Btype%5D=movie&filters%5Bonly_public%5D=yes&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&filters%5Bwith_files%5D=yes&sort=-upload_date&source=adjaranet';

export const seriesInGeorgianURL =
  'https://api.adjaranet.com/api/v1/movies?page=1&per_page=20&filters%5Blanguage%5D=GEO&filters%5Btype%5D=series&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&filters%5Bwith_files%5D=yes&sort=-upload_date&source=adjaranet';

export const collections =
  'https://api.adjaranet.com/api/v1/lists?page=1&per_page=60&sort=-popular&filters%5Busers%5D=187899%2C6797&source=adjaranet';

export const topSeriesDay =
  'https://api.adjaranet.com/api/v1/movies/top?type=series&period=day&page=1&per_page=20&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&source=adjaranet';

export const topSeriesWeek =
  'https://api.adjaranet.com/api/v1/movies/top?type=series&period=week&page=1&per_page=20&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&source=adjaranet	';

export const topSeriesMonth =
  'https://api.adjaranet.com/api/v1/movies/top?type=series&period=month&page=1&per_page=20&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&source=adjaranet	';

export const trailers =
  'https://api.adjaranet.com/api/v1/trailers/trailer-day?page=1&per_page=20&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&source=adjaranet';

export const moviesUrl = `https://api.adjaranet.com/api/v1/movies?page=1&per_page=7&filters%5Blanguage%5D=GEO&filters%5Byear_range%5D=1900%2C2022&filters%5Binit%5D=true&filters%5Bsort%5D=-upload_date&filters%5Btype%5D=movie&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&filters%5Bwith_files%5D=yes&sort=-upload_date&source=adjaranet`;

export const seriesUrl =
  'https://api.adjaranet.com/api/v1/movies?page=1&per_page=7&filters%5Blanguage%5D=GEO&filters%5Byear_range%5D=1900%2C2022&filters%5Binit%5D=true&filters%5Bsort%5D=-upload_date&filters%5Btype%5D=series&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&filters%5Bwith_files%5D=yes&sort=-upload_date&source=adjaranet';

export const topSeries =
  'https://api.adjaranet.com/api/v1/movies/top?type=series&period=day&page=1&per_page=21&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&source=adjaranet	';

export const searchUrl =
  'https://api.adjaranet.com/api/v1/search?filters%5Btype%5D=movie%2Ccast&keywords=fds&source=adjaranet	';

export const animations =
  'https://api.adjaranet.com/api/v1/movies?page=1&per_page=7&filters%5Btype%5D=movie&filters%5Byear_range%5D=1900%2C2022&filters%5Bgenre%5D=265&filters%5Binit%5D=true&filters%5Bsort%5D=-upload_date&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&filters%5Bwith_files%5D=yes&sort=-upload_date&source=adjaranet	';

export const documentaries =
  'https://api.adjaranet.com/api/v1/movies?page=1&per_page=7&filters%5Btype%5D=movie&filters%5Byear_range%5D=1900%2C2022&filters%5Bgenre%5D=252&filters%5Binit%5D=true&filters%5Bsort%5D=-upload_date&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&filters%5Bwith_files%5D=yes&sort=-upload_date&source=adjaranet	';

export const turkishSeries =
  'https://api.adjaranet.com/api/v1/movies?page=1&per_page=14&filters%5Blanguage%5D=GEO&filters%5Byear_range%5D=1900%2C2022&filters%5Bcountry%5D=336&filters%5Binit%5D=true&filters%5Bsort%5D=-upload_date&filters%5Btype%5D=series&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&filters%5Bwith_files%5D=yes&sort=-upload_date&source=adjaranet	';

export const allMovies =
  'https://api.adjaranet.com/api/v1/movies?page=1&per_page=14&filters%5Btype%5D=movie&filters%5Byear_range%5D=1900%2C2022&filters%5Binit%5D=true&filters%5Bsort%5D=-upload_date&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&filters%5Bwith_files%5D=yes&sort=-upload_date&source=adjaranet	';

export const allSeries =
  'https://api.adjaranet.com/api/v1/movies?page=1&per_page=14&filters%5Btype%5D=series&filters%5Byear_range%5D=1900%2C2022&filters%5Binit%5D=true&filters%5Bsort%5D=-upload_date&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&filters%5Bwith_files%5D=yes&sort=-upload_date&source=adjaranet	';

export const genresArray = [
  'ანიმაციური',
  'ბიოგრაფიული',
  'დეტექტივი',
  'დოკუმენტური',
  'დრამა',
  'ეროტიკული',
  'ვესტერნი',
  'ისტორიული',
  'კომედია',
  'მელოდრამა',
  'მიუზიკლი',
  'მოკლემეტრაჟიანი',
  'მისტიკა',
  'მუსიკალური',
  'მძაფრ-სიუჟეტიანი',
  'სათავგადასავლო',
  'ფანტასტიკა',
  'საომარი',
  'საოჯახო',
  'საშინელებათა',
  'ფილმი',
  'სერიალი',
  'სპორტული',
  'თრილერი',
  'ზღაპრული (ფენტეზი)',
  'ანიმე',
  'Reality-TV',
  'კონცერტი',
  'Stand Up',
  'ავტო',
  'TV Special',
];

export const countriesArray = [
  'აშშ',
  'საფრანგეთი',
  'დიდი ბრიტანეთი',
  'კანადა',
  'იტალია',
  'იაპონია',
  'გერმანია',
  'ესპანეთი',
  'რუსეთი',
  'ინდოეთი',
  'ავსტრალია',
  'დასავლეთ გერმანია',
  'ჰონკონგი',
  'შვედეთი',
  'ბელგია',
  'სამხრეთ კორეა',
  'ნიდერლანდი',
  'მექსიკა',
  'შვეიცარია',
  'ჩინეთი',
  'დანია',
  'პორტუგალია',
  'არგენტინა',
  'საბჭოთა კავშირი',
  'ბრაზილია',
  'პოლონეთი',
  'ავსტრია',
  'ირლანდია',
  'ნორვეგია',
  'ფილიპინები',
  'ფინეთი',
  'უნგრეთი',
  'ისრაელი',
  'სამხრეთ აფრიკა',
  'საბერძნეთი',
  'ირანი',
  'ჩილე',
  'რუმინეთი',
  'ჩეხეთი',
  'იუგოსლავია',
  'ტაივანი',
  'ახალი ზელანდია',
  'ეგვიპტე',
  'ტაილანდი',
  'ჩეხოსლოვაკია',
  'ინდონეზია',
  'ისლანდია',
  'საქართველო',
  'ლუქსემბურგი',
  'თურქეთი',
  'ლიტვა',
  'ბულგარეთი',
  'მაროკო',
  'უკრაინა',
  'კოლუმბია',
  'სინგაპური',
  'ტუნისი',
  'ესტონეთი',
  'კუბა',
  'ხორვატია',
  'სერბეთი',
  'ალჟირი',
  'მალაიზია',
  'ნიგერია',
  'სენეგალი',
  'ლიბანი',
  'ურუგვაი',
  'ლატვია',
  'ვენესუელა',
  'სლოვაკეთი',
  'პალესტინა',
  'პაკისტანი',
  'ბოსნია ჰერცოგოვინა',
  'აღმოსავლეთ გერმანია',
  'ვიეტნამი',
  'შრი-ლანკა',
  'პუერტო რიკო',
  'აზერბაიჯანი',
  'კენია',
  'კამერუნი',
  'მაკედონია',
  'სპილოს ძვლის კუნძულები',
  'ქატარი',
  'კვიპროსი',
  'მალი',
  'განა',
  'სომხეთი',
  'გვადელუპე',
  'ერაყი',
  'ალბანეთი',
  'სირია',
  'კამბოჯა',
  'ბოლივია',
  'დომენიკის რესპუბლიკა',
  'ჰაიტი',
];
