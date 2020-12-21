from os import environ

import asyncio
from autobahn.asyncio.wamp import ApplicationSession, ApplicationRunner


class Component(ApplicationSession):
    """
    An application component that publishes events with no payload and
    with complex payloads every second.
    """

    async def onJoin(self, details):
        while True:
            res = await self.call(u'wamp.registration.list')
            for reg_id in res['exact']:
                registration = await self.call('wamp.registration.get', reg_id)
                if registration['uri'] == '{}.ready'.format(environ['ROOT_TOPIC']):
                    self.log.info("{registration!r}", registration=registration)
                    self.leave()
                    return
            await asyncio.sleep(1)

    async def onChallenge(self, challenge):
        print("authentication challenge received")

    def onDisconnect(self):
        asyncio.get_event_loop().stop()


if __name__ == '__main__':
    runner = ApplicationRunner(
        environ["MODEL_SERVICE_WS_INT"],
        u"realm1",
    )
    runner.run(Component)
