FactoryBot.define do
  factory :video do
    user
    url { "https://www.youtube.com/watch?v=775IUf-FNtg" }
    title { "Video phóng sự Cao Cường - Phương Ngọc Wedding" }
    description { "Đám cưới Cao Cường - Phương Ngọc tại nhà gái (An Khê - Gia Lai)" }
    embed_html { '<iframe width="516" height="270" src="https://www.youtube.com/embed/775IUf-FNtg" title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' }
  end
end
