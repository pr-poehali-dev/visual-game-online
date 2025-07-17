import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [playerColor, setPlayerColor] = useState('#8B4513');
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [currentLocation, setCurrentLocation] = useState('tavern');
  const [chatMode, setChatMode] = useState('rp');
  const [chatMessage, setChatMessage] = useState('');
  const [playerPosition, setPlayerPosition] = useState(50);

  // Mock character data with real sprites
  const characterPacks = [
    { 
      id: 1, 
      name: 'Рыцарь', 
      preview: '/img/76c061bd-7d01-42b7-870d-66f2c4d67897.jpg',
      type: 'warrior',
      description: 'Благородный воин в доспехах'
    },
    { 
      id: 2, 
      name: 'Маг', 
      preview: '/img/da915364-2134-492f-9ef5-bde8eb318024.jpg',
      type: 'mage',
      description: 'Мудрый чародей'
    },
    { 
      id: 3, 
      name: 'Эльф', 
      preview: '/img/b4ef4293-4e8d-4103-84af-b8c4be0811c4.jpg',
      type: 'elf',
      description: 'Грациозный лучник'
    },
    { 
      id: 4, 
      name: 'Воин', 
      preview: '⚔️', 
      type: 'fighter',
      description: 'Свирепый берсерк'
    }
  ];

  const emotions = [
    { id: 'neutral', name: 'Обычное', icon: '😐', color: '#6B7280' },
    { id: 'happy', name: 'Радость', icon: '😊', color: '#10B981' },
    { id: 'sad', name: 'Грусть', icon: '😢', color: '#3B82F6' },
    { id: 'angry', name: 'Гнев', icon: '😠', color: '#EF4444' },
    { id: 'surprised', name: 'Удивление', icon: '😲', color: '#F59E0B' },
    { id: 'love', name: 'Любовь', icon: '😍', color: '#EC4899' }
  ];

  const locations = [
    { id: 'tavern', name: 'Таверна', description: 'Уютная таверна "Золотой дракон"', connections: ['square', 'forest'], bgColor: 'from-amber-900 to-orange-800' },
    { id: 'square', name: 'Площадь', description: 'Центральная площадь города', connections: ['tavern', 'castle', 'market'], bgColor: 'from-stone-400 to-gray-600' },
    { id: 'forest', name: 'Лес', description: 'Мистический Тёмный лес', connections: ['tavern', 'ruins'], bgColor: 'from-green-800 to-emerald-900' },
    { id: 'castle', name: 'Замок', description: 'Королевский замок', connections: ['square'], bgColor: 'from-purple-800 to-indigo-900' },
    { id: 'market', name: 'Рынок', description: 'Торговая площадь', connections: ['square'], bgColor: 'from-yellow-600 to-orange-700' },
    { id: 'ruins', name: 'Руины', description: 'Древние руины', connections: ['forest'], bgColor: 'from-gray-700 to-slate-800' }
  ];

  const mockMessages = [
    { type: 'rp', user: 'Элара', color: '#9b87f5', message: '*входит в таверну и осматривается вокруг*', emotion: 'curious', time: '14:23' },
    { type: 'ooc', user: 'Player123', color: '#6b7280', message: 'Кто-нибудь хочет поиграть в квест?', emotion: null, time: '14:24' },
    { type: 'rp', user: 'Торн Железнобород', color: '#dc2626', message: '*поднимает кружку эля и громко провозглашает* За удачу в наших приключениях!', emotion: 'happy', time: '14:25' },
    { type: 'rp', user: 'Лира Лунная', color: '#10b981', message: '*тихо играет на лютне в углу таверны*', emotion: 'neutral', time: '14:26' }
  ];

  const currentLocationData = locations.find(loc => loc.id === currentLocation);
  const currentEmotionData = emotions.find(em => em.id === currentEmotion);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden font-serif">
      
      {/* Top Header */}
      <div className="bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 text-white px-6 py-3 shadow-xl border-b-4 border-yellow-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Icon name="Crown" size={28} className="text-yellow-200" />
            <h1 className="text-xl font-bold tracking-wide">МИСТИЧЕСКИЙ МИР РП</h1>
          </div>
          {selectedCharacter && (
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={18} />
                <span className="font-medium">{playerName || 'Безымянный'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={18} />
                <span>{currentLocationData?.name}</span>
              </div>
              <div className="flex items-center space-x-2" style={{ color: currentEmotionData?.color }}>
                <span className="text-lg">{currentEmotionData?.icon}</span>
                <span className="text-sm">{currentEmotionData?.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        
        {/* Left Panel - Map & Navigation */}
        <div className="w-80 bg-gradient-to-b from-stone-800 to-stone-900 border-r-4 border-yellow-600 flex flex-col">
          
          {/* Mini Map */}
          <div className="p-4 border-b-2 border-stone-700">
            <h3 className="text-yellow-400 font-bold mb-3 flex items-center">
              <Icon name="Map" size={20} className="mr-2" />
              КАРТА МИРА
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {locations.map(location => (
                <Button
                  key={location.id}
                  variant={location.id === currentLocation ? "default" : "outline"}
                  size="sm"
                  className={`h-auto p-2 text-xs ${
                    location.id === currentLocation 
                      ? 'bg-yellow-600 text-white border-yellow-500' 
                      : 'bg-stone-700 border-stone-600 text-stone-300 hover:bg-stone-600'
                  }`}
                  onClick={() => setCurrentLocation(location.id)}
                >
                  <div className="text-center">
                    <div className="font-medium">{location.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Current Location Info */}
          <div className="p-4 border-b-2 border-stone-700">
            <div className={`p-4 rounded-lg bg-gradient-to-br ${currentLocationData?.bgColor} text-white`}>
              <h4 className="font-bold text-lg mb-2">{currentLocationData?.name}</h4>
              <p className="text-sm opacity-90 mb-3">{currentLocationData?.description}</p>
              
              {/* Available exits */}
              <div className="space-y-1">
                <div className="text-xs opacity-75">Доступные переходы:</div>
                {currentLocationData?.connections.map(locationId => {
                  const location = locations.find(loc => loc.id === locationId);
                  return (
                    <Button
                      key={locationId}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-black/20 border-white/30 text-white hover:bg-white/10 text-xs"
                      onClick={() => setCurrentLocation(locationId)}
                    >
                      <Icon name="ArrowRight" size={14} className="mr-2" />
                      {location?.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Character Selection */}
          <div className="flex-1 p-4">
            {!selectedCharacter ? (
              <div className="space-y-4">
                <h3 className="text-yellow-400 font-bold flex items-center">
                  <Icon name="Users" size={20} className="mr-2" />
                  ВЫБОР ПЕРСОНАЖА
                </h3>
                
                <div className="space-y-3">
                  {characterPacks.map(char => (
                    <Button
                      key={char.id}
                      variant="outline"
                      className="w-full h-20 p-3 bg-stone-700 border-stone-600 hover:bg-stone-600 text-left"
                      onClick={() => setSelectedCharacter(char)}
                    >
                      <div className="flex items-center space-x-3">
                        {char.preview.startsWith('/') ? (
                          <img src={char.preview} alt={char.name} className="w-12 h-12 rounded object-cover" />
                        ) : (
                          <div className="text-2xl">{char.preview}</div>
                        )}
                        <div>
                          <div className="font-medium text-white">{char.name}</div>
                          <div className="text-xs text-stone-400">{char.description}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>

                <Separator className="bg-stone-600" />

                <div className="space-y-3">
                  <div>
                    <label className="text-yellow-400 text-sm font-medium block mb-1">Имя персонажа:</label>
                    <Input 
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="Введите имя"
                      className="bg-stone-700 border-stone-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="text-yellow-400 text-sm font-medium block mb-1">Цвет речи:</label>
                    <div className="grid grid-cols-5 gap-1">
                      {['#8B4513', '#9b87f5', '#dc2626', '#10b981', '#0ea5e9'].map(color => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded border-2 ${playerColor === color ? 'border-yellow-400' : 'border-stone-500'}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setPlayerColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-yellow-400 font-bold flex items-center">
                  <Icon name="User" size={20} className="mr-2" />
                  МОЙ ПЕРСОНАЖ
                </h3>
                
                <div className="bg-stone-700 p-4 rounded-lg border border-stone-600">
                  <div className="flex items-center space-x-3 mb-3">
                    {selectedCharacter.preview.startsWith('/') ? (
                      <img src={selectedCharacter.preview} alt={selectedCharacter.name} className="w-16 h-16 rounded object-cover" />
                    ) : (
                      <div className="text-3xl">{selectedCharacter.preview}</div>
                    )}
                    <div>
                      <div className="font-bold text-white">{playerName || selectedCharacter.name}</div>
                      <div className="text-sm text-stone-400">{selectedCharacter.description}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-yellow-400 text-sm font-medium block mb-2">Эмоции:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {emotions.map(emotion => (
                      <Button
                        key={emotion.id}
                        variant={currentEmotion === emotion.id ? "default" : "outline"}
                        size="sm"
                        className={`h-auto p-2 ${
                          currentEmotion === emotion.id 
                            ? 'bg-yellow-600 border-yellow-500' 
                            : 'bg-stone-700 border-stone-600 hover:bg-stone-600'
                        }`}
                        onClick={() => setCurrentEmotion(emotion.id)}
                      >
                        <div className="text-center">
                          <div className="text-lg">{emotion.icon}</div>
                          <div className="text-xs">{emotion.name}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-stone-600 border-stone-500 text-white hover:bg-stone-500"
                  onClick={() => setSelectedCharacter(null)}
                >
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Сменить персонажа
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Center Panel - Game World */}
        <div className="flex-1 flex flex-col">
          
          {/* Game Area */}
          <div className="flex-1 relative overflow-hidden">
            <div className={`w-full h-full bg-gradient-to-b ${currentLocationData?.bgColor} relative`}>
              
              {/* Location Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-black/30"></div>
              </div>

              {/* Characters in scene */}
              {selectedCharacter && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="flex flex-col items-center">
                    {selectedCharacter.preview.startsWith('/') ? (
                      <img 
                        src={selectedCharacter.preview} 
                        alt={selectedCharacter.name} 
                        className="w-24 h-24 object-cover rounded-lg shadow-xl border-4 border-yellow-400"
                      />
                    ) : (
                      <div className="text-6xl filter drop-shadow-lg">{selectedCharacter.preview}</div>
                    )}
                    <div className="mt-2 bg-black/70 px-3 py-1 rounded-full border border-yellow-400">
                      <div className="text-white text-sm font-medium" style={{ color: playerColor }}>
                        {playerName || selectedCharacter.name}
                      </div>
                    </div>
                    {currentEmotion !== 'neutral' && (
                      <div className="text-2xl mt-1 filter drop-shadow-lg">
                        {currentEmotionData?.icon}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Location overlay info */}
              <div className="absolute top-4 left-4">
                <div className="bg-black/60 backdrop-blur-sm p-3 rounded-lg border border-yellow-400/50">
                  <h2 className="text-white font-bold text-lg">{currentLocationData?.name}</h2>
                  <p className="text-yellow-200 text-sm">{currentLocationData?.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom action bar */}
          <div className="bg-stone-800 border-t-4 border-yellow-600 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-yellow-600 text-white">
                  Онлайн: 127
                </Badge>
                <Badge variant="outline" className="border-stone-600 text-stone-300">
                  {currentLocationData?.name}: 12 игроков
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="border-stone-600 text-stone-300 hover:bg-stone-700">
                  <Icon name="Settings" size={16} className="mr-1" />
                  Настройки
                </Button>
                <Button size="sm" variant="outline" className="border-stone-600 text-stone-300 hover:bg-stone-700">
                  <Icon name="Users" size={16} className="mr-1" />
                  Игроки
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Chat */}
        <div className="w-96 bg-gradient-to-b from-stone-800 to-stone-900 border-l-4 border-yellow-600 flex flex-col">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-yellow-600 to-amber-600 p-3 border-b-2 border-yellow-700">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold flex items-center">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                ЧАТ
              </h3>
              <div className="flex space-x-1">
                <Button
                  variant={chatMode === 'rp' ? "secondary" : "ghost"}
                  size="sm"
                  className={`px-2 py-1 text-xs ${
                    chatMode === 'rp' 
                      ? 'bg-white text-yellow-700' 
                      : 'text-white hover:bg-yellow-700'
                  }`}
                  onClick={() => setChatMode('rp')}
                >
                  РП
                </Button>
                <Button
                  variant={chatMode === 'ooc' ? "secondary" : "ghost"}
                  size="sm"
                  className={`px-2 py-1 text-xs ${
                    chatMode === 'ooc' 
                      ? 'bg-white text-yellow-700' 
                      : 'text-white hover:bg-yellow-700'
                  }`}
                  onClick={() => setChatMode('ooc')}
                >
                  ООС
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-3">
              {mockMessages
                .filter(msg => msg.type === chatMode)
                .map((msg, idx) => (
                <div key={idx} className="bg-stone-700/50 backdrop-blur-sm p-3 rounded-lg border border-stone-600">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm" style={{ color: msg.color }}>
                        {msg.user}
                      </span>
                      {msg.emotion && (
                        <span className="text-lg">
                          {emotions.find(e => e.id === msg.emotion)?.icon}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-stone-400">{msg.time}</span>
                  </div>
                  <p className="text-stone-200 text-sm leading-relaxed">{msg.message}</p>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-3 border-t-2 border-stone-700 bg-stone-800">
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={chatMode === 'rp' ? 'Введите РП действие...' : 'Введите ООС сообщение...'}
                  className="flex-1 bg-stone-700 border-stone-600 text-white placeholder:text-stone-400"
                />
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  <Icon name="Send" size={16} />
                </Button>
              </div>
              
              {selectedCharacter && chatMode === 'rp' && (
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-stone-400">Как:</span>
                  <span style={{ color: playerColor }} className="font-medium">
                    {playerName || selectedCharacter.name}
                  </span>
                  <span className="text-lg">{currentEmotionData?.icon}</span>
                  <span className="text-stone-400">в локации:</span>
                  <span className="text-yellow-400">{currentLocationData?.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;