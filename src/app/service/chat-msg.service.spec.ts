import { TestBed } from '@angular/core/testing';

import { ChatMsgService } from './chat-msg.service';

describe('ChatMsgService', () => {
  let service: ChatMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
