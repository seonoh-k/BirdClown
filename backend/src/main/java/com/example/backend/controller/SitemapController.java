package com.example.backend.controller;

import com.example.backend.entity.Album;
import com.example.backend.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SitemapController {

    private final AlbumService albumService;
    private static final String BASE_URL = "https://birdclown.kr";

    @GetMapping(value = "/sitemap.xml", produces = "application/xml; charset=UTF-8")
    public String generateSitemap() {
        List<Album> albumList = albumService.getAllAlbums();
        StringBuilder xmlBuilder = new StringBuilder();
        xmlBuilder.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        xmlBuilder.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\">\n");

        addUrl(xmlBuilder, "/", "2025-08-23", "yearly", "1.0");
        addUrl(xmlBuilder, "/about", "2025-08-23", "yearly", "0.8");
        addUrl(xmlBuilder, "/services", "2025-08-23", "yearly", "0.8");
        addUrl(xmlBuilder, "/gallery", "2025-08-23", "weekly", "0.8");
        addUrl(xmlBuilder, "/contact", "2025-08-23", "yearly", "0.8");

        for (Album album : albumList) {
            addUrl(xmlBuilder, "/gallery/detail/" + album.getId(),
                    String.valueOf(album.getEventDate()), "weekly", "0.5");
        }

        xmlBuilder.append("</urlset>");
        return xmlBuilder.toString();
    }

    private void addUrl(StringBuilder xmlBuilder, String path, String date, String change, String priority) {
        String url = BASE_URL + path;
        xmlBuilder.append("  <url>\n");
        xmlBuilder.append("    <loc>").append(url).append("</loc>\n");
        xmlBuilder.append("    <lastmod>").append(date).append("</lastmod>\n");
        xmlBuilder.append("    <changefreq>").append(change).append("</changefreq>\n");
        xmlBuilder.append("    <priority>").append(priority).append("</priority>\n");

        if("/".equals(path)) {
            xmlBuilder.append("    <image:image>\n");
            xmlBuilder.append("      <image:loc>https://birdclown.kr/BIRDCLOWN3.png</image:loc>\n");
            xmlBuilder.append("      <image:caption>홈 페이지 메인 로고</image:caption>\n");
            xmlBuilder.append("    </image:image>\n");
        }

        xmlBuilder.append("  </url>\n");
    }
}
