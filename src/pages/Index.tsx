import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
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

  // Mock character data
  const characterPacks = [
    { id: 1, name: 'Рыцарь', preview: '🛡️', type: 'warrior' },
    { id: 2, name: 'Маг', preview: '🧙‍♂️', type: 'mage' },
    { id: 3, name: 'Эльф', preview: '🧝‍♀️', type: 'elf' },
    { id: 4, name: 'Воин', preview: '⚔️', type: 'fighter' }
  ];

  const emotions = [
    { id: 'neutral', name: 'Обычное', icon: '😐' },
    { id: 'happy', name: 'Радость', icon: '😊' },
    { id: 'sad', name: 'Грусть', icon: '😢' },
    { id: 'angry', name: 'Гнев', icon: '😠' },
    { id: 'surprised', name: 'Удивление', icon: '😲' },
    { id: 'love', name: 'Любовь', icon: '😍' }
  ];

  const locations = [
    { id: 'tavern', name: 'Таверна', description: 'Уютная таверна с камином', connections: ['square', 'forest'] },
    { id: 'square', name: 'Площадь', description: 'Городская площадь', connections: ['tavern', 'castle', 'market'] },
    { id: 'forest', name: 'Лес', description: 'Тёмный лес', connections: ['tavern'] },
    { id: 'castle', name: 'Замок', description: 'Величественный замок', connections: ['square'] },
    { id: 'market', name: 'Рынок', description: 'Торговая площадь', connections: ['square'] }
  ];

  const mockMessages = [
    { type: 'rp', user: 'Элара', color: '#9b87f5', message: '*входит в таверну и осматривается*', emotion: 'curious' },
    { type: 'ooc', user: 'Player123', color: '#6b7280', message: 'Кто-нибудь хочет поиграть?', emotion: null },
    { type: 'rp', user: 'Торн', color: '#dc2626', message: '*поднимает кружку эля* За удачу!', emotion: 'happy' }
  ];

  const currentLocationData = locations.find(loc => loc.id === currentLocation);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-purple-100 font-serif">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-amber-700 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Castle" size={32} className="text-amber-300" />
            <h1 className="text-2xl font-bold">Мистический Мир РП</h1>
          </div>
          {selectedCharacter && (
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-amber-200 text-purple-900">
                <Icon name="User" size={16} className="mr-1" />
                {playerName || 'Безымянный'}
              </Badge>
              <Badge variant="secondary" className="bg-purple-200 text-purple-900">
                <Icon name="MapPin" size={16} className="mr-1" />
                {currentLocationData?.name}
              </Badge>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-12 gap-4 h-[calc(100vh-80px)]">
        
        {/* Left Panel - Character Selection */}
        <div className="col-span-3">
          <Card className="h-full border-2 border-amber-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-amber-600 text-white">
              <CardTitle className="flex items-center">
                <Icon name="Users" size={20} className="mr-2" />
                Персонаж
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {!selectedCharacter ? (
                <>
                  <h3 className="font-semibold text-purple-800">Выберите пак спрайтов:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {characterPacks.map(char => (
                      <Button
                        key={char.id}
                        variant="outline"
                        className="h-20 border-2 border-amber-300 hover:bg-amber-100"
                        onClick={() => setSelectedCharacter(char)}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">{char.preview}</div>
                          <div className="text-xs">{char.name}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-800">Имя:</label>
                    <Input 
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="Введите имя персонажа"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-800">Цвет речи:</label>
                    <div className="flex space-x-2">
                      {['#8B4513', '#9b87f5', '#dc2626', '#16a34a', '#0ea5e9'].map(color => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full border-2 ${playerColor === color ? 'border-gray-800' : 'border-gray-300'}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setPlayerColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="text-4xl mb-2">{selectedCharacter.preview}</div>
                    <div className="font-semibold text-purple-800">{playerName || selectedCharacter.name}</div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">Эмоции:</h4>
                    <div className="grid grid-cols-3 gap-1">
                      {emotions.map(emotion => (
                        <Button
                          key={emotion.id}
                          variant={currentEmotion === emotion.id ? "default" : "outline"}
                          size="sm"
                          className={`h-auto p-2 ${currentEmotion === emotion.id ? 'bg-purple-600' : 'border-amber-300'}`}
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
                    className="w-full border-amber-300"
                    onClick={() => setSelectedCharacter(null)}
                  >
                    <Icon name="ArrowLeft" size={16} className="mr-1" />
                    Сменить персонажа
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Center Panel - Game Area */}
        <div className="col-span-6 space-y-4">
          
          {/* Location Display */}
          <Card className="border-2 border-amber-200 shadow-lg">
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-purple-800">{currentLocationData?.name}</h2>
                <p className="text-sm text-gray-600">{currentLocationData?.description}</p>
              </div>
              
              {/* Character Position */}
              {selectedCharacter && (
                <div className="relative h-32 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg border border-amber-300 mb-4">
                  <div 
                    className="absolute bottom-2 transition-all duration-300 transform -translate-x-1/2"
                    style={{ left: `${playerPosition}%` }}
                  >
                    <div className="text-center">
                      <div className="text-3xl">{selectedCharacter.preview}</div>
                      <div className="text-xs bg-white px-2 py-1 rounded shadow border" style={{ color: playerColor }}>
                        {playerName || 'Персонаж'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Position Control */}
              {selectedCharacter && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-800">Позиция:</label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={playerPosition}
                    onChange={(e) => setPlayerPosition(parseInt(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="flex-1 border-2 border-amber-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-600 to-purple-600 text-white p-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Чат
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant={chatMode === 'rp' ? "secondary" : "outline"}
                    size="sm"
                    className={chatMode === 'rp' ? 'bg-white text-purple-600' : 'border-white text-white hover:bg-white hover:text-purple-600'}
                    onClick={() => setChatMode('rp')}
                  >
                    РП
                  </Button>
                  <Button
                    variant={chatMode === 'ooc' ? "secondary" : "outline"}
                    size="sm"
                    className={chatMode === 'ooc' ? 'bg-white text-purple-600' : 'border-white text-white hover:bg-white hover:text-purple-600'}
                    onClick={() => setChatMode('ooc')}
                  >
                    ООС
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-80">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {mockMessages
                    .filter(msg => msg.type === chatMode)
                    .map((msg, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold" style={{ color: msg.color }}>
                          {msg.user}
                        </span>
                        {msg.emotion && (
                          <span className="text-sm">
                            {emotions.find(e => e.id === msg.emotion)?.icon}
                          </span>
                        )}
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex space-x-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder={chatMode === 'rp' ? 'Введите РП сообщение...' : 'Введите ООС сообщение...'}
                    className="flex-1"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Icon name="Send" size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Map & Navigation */}
        <div className="col-span-3">
          <Card className="h-full border-2 border-amber-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-600 to-purple-600 text-white">
              <CardTitle className="flex items-center">
                <Icon name="Map" size={20} className="mr-2" />
                Карта
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <Icon name="MapPin" size={24} className="mx-auto mb-2 text-purple-600" />
                <div className="font-semibold text-purple-800">{currentLocationData?.name}</div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">Доступные локации:</h4>
                <div className="space-y-2">
                  {currentLocationData?.connections.map(locationId => {
                    const location = locations.find(loc => loc.id === locationId);
                    return (
                      <Button
                        key={locationId}
                        variant="outline"
                        className="w-full justify-start border-amber-300 hover:bg-amber-100"
                        onClick={() => setCurrentLocation(locationId)}
                      >
                        <Icon name="ArrowRight" size={16} className="mr-2" />
                        {location?.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">Все локации:</h4>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {locations.map(location => (
                    <div 
                      key={location.id}
                      className={`p-2 rounded border ${location.id === currentLocation ? 'bg-purple-100 border-purple-300' : 'bg-gray-50 border-gray-200'}`}
                    >
                      <div className="font-medium">{location.name}</div>
                      <div className="text-gray-600">{location.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;