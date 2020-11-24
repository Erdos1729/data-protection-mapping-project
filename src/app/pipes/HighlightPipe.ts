import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FullDocNode } from '../standard-map';
import { ViewSettings } from '../ViewSettings';


function highlightText(text: string, highlight: number[]): string
{
    return text.substring(0, highlight[0]) + "<mark>" + text.substring(highlight[0], highlight[1]) + "</mark>" + text.substring(highlight[1], text.length);
}

@Pipe({ name: 'injectHighlightBody' })
export class injectHighlightBodyPipe implements PipeTransform {
    constructor(
        private sanitizer: DomSanitizer) {
    }

    transform(viewSettings: ViewSettings, data: FullDocNode): SafeHtml {
        var body = data.getBody(viewSettings.selectedLang);
        if (body)
        {
            if (data.highlight && !data.highlightName)
            {
                body = highlightText(body, data.highlight);
            }
        }   
        else
            body = "";

        return this.sanitizer.bypassSecurityTrustHtml(body);
    }
}

@Pipe({ name: 'injectHighlightSection' })
export class injectHighlightSectionPipe implements PipeTransform {
    constructor(
        private sanitizer: DomSanitizer) {
    }

    transform(viewSettings: ViewSettings, data: FullDocNode): SafeHtml {
        var section = data.getSection(viewSettings.selectedLang);

        if (data.highlight && data.highlightName)
            section = highlightText(section, data.highlight);

        return this.sanitizer.bypassSecurityTrustHtml(section);
    }
}
